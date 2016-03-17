var React = require('react')
var classNames = require('classnames');

var Touchable = React.createClass({
  propTypes: {
    //onTap: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      target: null,
      active: false
    }
  },

  resetState: function () {
    this.setState({
      target: null,
      active: false
    })
  },

  touchStart: function (e) {
    if (e.touches.length === 1) {
      this.setState({
        target: e.target,
        active: true
      })
    }
  },

  touchEnd: function (e) {
    if (!this.state.active) {
      return this.resetState()
    }

    var changedTouches = e.changedTouches[0]
    if (changedTouches) {
      var elem = document.elementFromPoint(changedTouches.pageX, changedTouches.pageY)
      if (elem !== this.state.target) {
        return this.resetState()
      }
    }

    this.resetState()
    //this.props.onTap(e)
  },

  onTap:function(e){
      //this.setState({
      //  target: e.target,
      //  backgroundColor: 'red'
      //})
      var ctx=this;
      if (this.props.onTap)
     setTimeout(function(){ctx.props.onTap(e);},1)
  },

  render: function () {
    //console.log("render")
    var classes = classNames({
      active: this.state.active
    })
    var properties = {
      className: classes
    }
    if (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement) {
      properties.onTouchStart = this.touchStart
      properties.onTouchEnd = this.touchEnd
      properties.onTouchTap = this.onTap
    } else {
      properties.onTouchTap = this.onTap
    }
    properties.style={}

    if (this.props.style != null ) { properties.style=this.props.style }

    if (this.state.active) {
      properties.style.opacity = 0.5
    }else{
      properties.style.opacity = 1
    }

    return React.createElement('div', properties, this.props.children)
  }
})

module.exports = Touchable
