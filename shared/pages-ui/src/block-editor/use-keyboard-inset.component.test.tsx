import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { act, cleanup, renderHook } from "@shared/utils-test"
import { keyboardInsetFromViewport, useKeyboardInset } from "./use-keyboard-inset"

describe("keyboardInsetFromViewport", () => {
  const LAYOUT = 874

  test("resize case: caret high, visual viewport shrinks by the keyboard height, offsetTop 0", () => {
    expect(keyboardInsetFromViewport({ height: 566, offsetTop: 0 }, LAYOUT)).toBe(308)
  })

  test("pan case: offsetTop carries the displacement while height holds", () => {
    expect(keyboardInsetFromViewport({ height: 566, offsetTop: 215 }, LAYOUT)).toBe(93)
    expect(keyboardInsetFromViewport({ height: 566, offsetTop: 284 }, LAYOUT)).toBe(24)
    expect(keyboardInsetFromViewport({ height: 566, offsetTop: 308 }, LAYOUT)).toBe(0)
  })

  test("absent case: no visualViewport → 0 (graceful degrade to the layout bottom)", () => {
    expect(keyboardInsetFromViewport(null, LAYOUT)).toBe(0)
  })

  test("clamps at 0 when the visual viewport is not shorter than the layout", () => {
    expect(keyboardInsetFromViewport({ height: 874, offsetTop: 0 }, LAYOUT)).toBe(0)
    expect(keyboardInsetFromViewport({ height: 900, offsetTop: 0 }, LAYOUT)).toBe(0)
  })
})

interface MockVisualViewport {
  height: number
  offsetTop: number
  addEventListener: (type: string, fn: () => void) => void
  removeEventListener: (type: string, fn: () => void) => void
}

let vv: MockVisualViewport
let listeners: Map<string, Set<() => void>>
let originalVv: PropertyDescriptor | undefined

function fire(type: string): undefined {
  act(() => {
    for (const fn of listeners.get(type) ?? []) fn()
  })
}

let rafCallbacks: Map<number, () => void>
let rafIdCounter: number
let originalRaf: typeof globalThis.requestAnimationFrame
let originalCancelRaf: typeof globalThis.cancelAnimationFrame

let clientHeightValue: number
let originalClientHeight: PropertyDescriptor | undefined

function flushRaf(): undefined {
  act(() => {
    const batch = [...rafCallbacks.values()]
    rafCallbacks = new Map()
    for (const cb of batch) cb()
  })
}

function rafPending(): boolean {
  return rafCallbacks.size > 0
}

beforeEach(() => {
  window.innerHeight = 800
  clientHeightValue = 800
  originalClientHeight = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(document.documentElement),
    "clientHeight"
  )
  Object.defineProperty(document.documentElement, "clientHeight", {
    configurable: true,
    get: () => clientHeightValue,
  })
  listeners = new Map()
  vv = {
    height: 800,
    offsetTop: 0,
    addEventListener: (type, fn) => {
      const set = listeners.get(type) ?? new Set()
      set.add(fn)
      listeners.set(type, set)
    },
    removeEventListener: (type, fn) => {
      listeners.get(type)?.delete(fn)
    },
  }
  originalVv = Object.getOwnPropertyDescriptor(window, "visualViewport")
  Object.defineProperty(window, "visualViewport", { value: vv, configurable: true })

  rafCallbacks = new Map()
  rafIdCounter = 0
  originalRaf = globalThis.requestAnimationFrame
  originalCancelRaf = globalThis.cancelAnimationFrame
  globalThis.requestAnimationFrame = (cb) => {
    const id = ++rafIdCounter
    rafCallbacks.set(id, () => cb(0))
    return id
  }
  globalThis.cancelAnimationFrame = (id) => {
    rafCallbacks.delete(id)
  }
})

afterEach(() => {
  cleanup()
  if (originalVv !== undefined) Object.defineProperty(window, "visualViewport", originalVv)
  else Reflect.deleteProperty(window, "visualViewport")
  Reflect.deleteProperty(document.documentElement, "clientHeight")
  if (originalClientHeight !== undefined) {
    Object.defineProperty(
      Object.getPrototypeOf(document.documentElement),
      "clientHeight",
      originalClientHeight
    )
  }
  globalThis.requestAnimationFrame = originalRaf
  globalThis.cancelAnimationFrame = originalCancelRaf
})

describe("useKeyboardInset", () => {
  test("starts at 0 when no keyboard is shown", () => {
    const { result } = renderHook(() => useKeyboardInset())
    expect(result.current).toBe(0)
  })

  test("a focusin re-samples the inset even when no resize event fires (first-open race)", () => {
    const { result } = renderHook(() => useKeyboardInset())
    expect(result.current).toBe(0)
    vv.height = 500
    act(() => {
      window.dispatchEvent(new Event("focusin"))
    })
    expect(result.current).toBe(300)
  })

  test("a geometrychange re-samples the inset as the caret pans (offsetTop grows, no resize/scroll)", () => {
    const { result } = renderHook(() => useKeyboardInset())
    vv.height = 500
    fire("resize")
    expect(result.current).toBe(300)
    vv.offsetTop = 150
    fire("geometrychange")
    expect(result.current).toBe(150)
    vv.offsetTop = 200
    fire("geometrychange")
    expect(result.current).toBe(100)
  })

  test("a demand-scoped rAF re-samples the pan when NO viewport event fires (geometrychange silent/absent)", () => {
    const { result } = renderHook(() => useKeyboardInset())
    vv.height = 500
    act(() => {
      window.dispatchEvent(new Event("focusin"))
    })
    expect(result.current).toBe(300)
    vv.offsetTop = 150
    flushRaf()
    expect(result.current).toBe(150)
    vv.offsetTop = 200
    flushRaf()
    expect(result.current).toBe(100)
  })

  test("the rAF loop runs only while a block is focused — stops on focusout (Consume on Demand)", () => {
    renderHook(() => useKeyboardInset())
    expect(rafPending()).toBe(false)
    act(() => {
      window.dispatchEvent(new Event("focusin"))
    })
    expect(rafPending()).toBe(true)
    act(() => {
      window.dispatchEvent(new Event("focusout"))
    })
    expect(rafPending()).toBe(false)
  })

  test("uses documentElement.clientHeight, not the pan-corrupted window.innerHeight (#15536 burial)", () => {
    clientHeightValue = 874
    window.innerHeight = 874
    const { result } = renderHook(() => useKeyboardInset())
    vv.height = 566
    act(() => {
      window.dispatchEvent(new Event("focusin"))
    })
    expect(result.current).toBe(308)
    window.innerHeight = 659
    vv.offsetTop = 215
    flushRaf()
    expect(result.current).toBe(93)
  })

  test("returns 0 and registers nothing when visualViewport is absent", () => {
    Reflect.deleteProperty(window, "visualViewport")
    const { result } = renderHook(() => useKeyboardInset())
    expect(result.current).toBe(0)
    act(() => {
      window.dispatchEvent(new Event("focusin"))
    })
    expect(result.current).toBe(0)
  })
})
