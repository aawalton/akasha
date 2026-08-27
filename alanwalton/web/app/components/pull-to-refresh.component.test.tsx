import { afterEach, beforeEach, describe, expect, it, spyOn } from "bun:test"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { PullToRefresh } from "./pull-to-refresh"

function touchEvent(type: string, clientY: number): Event {
  const e = new Event(type, { bubbles: true, cancelable: true })
  const touches = type === "touchend" || type === "touchcancel" ? [] : [{ clientY }]
  Object.defineProperty(e, "touches", { value: touches })
  Object.defineProperty(e, "changedTouches", { value: [{ clientY }] })
  return e
}

function dispatch(type: string, clientY: number): Event {
  const e = touchEvent(type, clientY)
  act(() => {
    window.dispatchEvent(e)
  })
  return e
}

function openRadixMenu(): HTMLElement {
  const el = document.createElement("div")
  el.setAttribute("data-radix-popper-content-wrapper", "")
  document.body.appendChild(el)
  return el
}

function armAndPullPastThreshold() {
  dispatch("touchstart", 200)
  dispatch("touchmove", 350)
}

let reloadSpy: ReturnType<typeof spyOn>

beforeEach(() => {
  Object.defineProperty(window.navigator, "maxTouchPoints", { value: 5, configurable: true })
  window.scrollTo(0, 0)
  reloadSpy = spyOn(window.location, "reload").mockImplementation(() => {})
})

afterEach(() => {
  cleanup()
  reloadSpy.mockRestore()
})

describe("PullToRefresh", () => {
  it("does NOT reload when a mid-pull touchcancel aborts the gesture (#15690 second hole)", () => {
    render(<PullToRefresh />)
    armAndPullPastThreshold()
    dispatch("touchcancel", 350)
    expect(reloadSpy).not.toHaveBeenCalled()
  })

  it("still reloads on a genuine at-top touchend release (recovery gesture stays alive)", () => {
    render(<PullToRefresh />)
    armAndPullPastThreshold()
    dispatch("touchend", 350)
    expect(reloadSpy).toHaveBeenCalledTimes(1)
  })

  it("does not reload on a touchend that never crossed the trigger threshold", () => {
    render(<PullToRefresh />)
    dispatch("touchstart", 200)
    dispatch("touchmove", 210)
    dispatch("touchend", 210)
    expect(reloadSpy).not.toHaveBeenCalled()
  })

  it("does not arm — and so never reloads — when the window is scrolled off the top", () => {
    Object.defineProperty(window, "scrollY", { value: 300, configurable: true })
    render(<PullToRefresh />)
    armAndPullPastThreshold()
    dispatch("touchend", 350)
    expect(reloadSpy).not.toHaveBeenCalled()
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true })
  })

  it("menu open during the drag: no reload AND no preventDefault (the #15790 bug)", () => {
    const menu = openRadixMenu()
    render(<PullToRefresh />)
    dispatch("touchstart", 200)
    const move = dispatch("touchmove", 350)
    dispatch("touchend", 350)
    expect(reloadSpy).not.toHaveBeenCalled()
    expect(move.defaultPrevented).toBe(false)
    menu.remove()
  })

  it("latches: a menu seen mid-drag keeps the reload suppressed after it closes", () => {
    const menu = openRadixMenu()
    render(<PullToRefresh />)
    dispatch("touchstart", 200)
    dispatch("touchmove", 300)
    menu.remove()
    dispatch("touchmove", 350)
    dispatch("touchend", 350)
    expect(reloadSpy).not.toHaveBeenCalled()
  })

  it("no menu open: still preventDefaults and reloads (legit pull-refresh intact)", () => {
    render(<PullToRefresh />)
    dispatch("touchstart", 200)
    const move = dispatch("touchmove", 350)
    expect(move.defaultPrevented).toBe(true)
    dispatch("touchend", 350)
    expect(reloadSpy).toHaveBeenCalledTimes(1)
  })
})
