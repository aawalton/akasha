import { afterEach, describe, expect, it } from "bun:test"
import { act, cleanup, renderHook } from "@shared/utils-test"
import {
  __resetKeyboardRegistryForTest,
  triggerBinding,
  useKeyboardBinding,
  useKeyboardScope,
  useShortcutsEnabled,
} from "./use-keyboard-registry"

afterEach(() => {
  cleanup()
  __resetKeyboardRegistryForTest()
  localStorage.clear()
})

function pressKey(init: KeyboardEventInit, target: EventTarget = document) {
  act(() => {
    target.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, ...init }))
  })
}

describe("useKeyboardBinding", () => {
  it("fires onTrigger when the resolved chord is pressed", () => {
    let count = 0
    renderHook(() =>
      useKeyboardBinding({
        id: "toggle",
        chord: "Mod+Alt+T",
        label: "Toggle",
        onTrigger: () => {
          count++
        },
      })
    )
    pressKey({ key: "t", code: "KeyT", ctrlKey: true, altKey: true })
    expect(count).toBe(1)
  })

  it("does not fire for a non-matching chord", () => {
    let count = 0
    renderHook(() =>
      useKeyboardBinding({
        id: "toggle",
        chord: "Mod+Alt+T",
        label: "Toggle",
        onTrigger: () => {
          count++
        },
      })
    )
    pressKey({ key: "a", code: "KeyA", ctrlKey: true, altKey: true })
    expect(count).toBe(0)
  })

  it("detaches the document listener after the last binding unmounts", () => {
    let count = 0
    const { unmount } = renderHook(() =>
      useKeyboardBinding({
        id: "toggle",
        chord: "Mod+Alt+T",
        label: "Toggle",
        onTrigger: () => {
          count++
        },
      })
    )
    unmount()
    pressKey({ key: "t", code: "KeyT", ctrlKey: true, altKey: true })
    expect(count).toBe(0)
  })

  it("does not register a binding declared enabled:false", () => {
    let count = 0
    renderHook(() =>
      useKeyboardBinding({
        id: "toggle",
        chord: "Mod+Alt+T",
        label: "Toggle",
        enabled: false,
        onTrigger: () => {
          count++
        },
      })
    )
    pressKey({ key: "t", code: "KeyT", ctrlKey: true, altKey: true })
    expect(count).toBe(0)
  })

  it("typing-guard: does not fire while a text input holds focus", () => {
    let count = 0
    renderHook(() =>
      useKeyboardBinding({
        id: "toggle",
        chord: "Mod+Alt+T",
        label: "Toggle",
        onTrigger: () => {
          count++
        },
      })
    )
    const input = document.createElement("input")
    document.body.appendChild(input)
    input.focus()
    pressKey({ key: "t", code: "KeyT", ctrlKey: true, altKey: true }, input)
    expect(count).toBe(0)
    input.remove()
  })

  it("calls preventDefault on a matching chord", () => {
    renderHook(() =>
      useKeyboardBinding({ id: "toggle", chord: "Mod+Alt+T", label: "Toggle", onTrigger: () => {} })
    )
    const event = new KeyboardEvent("keydown", {
      key: "t",
      code: "KeyT",
      ctrlKey: true,
      altKey: true,
      bubbles: true,
      cancelable: true,
    })
    act(() => {
      document.dispatchEvent(event)
    })
    expect(event.defaultPrevented).toBe(true)
  })

  it("respects preventDefault:false and leaves the event's default intact", () => {
    renderHook(() =>
      useKeyboardBinding({
        id: "toggle",
        chord: "Mod+Alt+T",
        label: "Toggle",
        preventDefault: false,
        onTrigger: () => {},
      })
    )
    const event = new KeyboardEvent("keydown", {
      key: "t",
      code: "KeyT",
      ctrlKey: true,
      altKey: true,
      bubbles: true,
      cancelable: true,
    })
    act(() => {
      document.dispatchEvent(event)
    })
    expect(event.defaultPrevented).toBe(false)
  })
})

describe("useShortcutsEnabled — the mandated global WCAG 2.1.4 toggle", () => {
  it("suppresses character-key shortcuts when disabled and restores them when re-enabled", () => {
    let count = 0
    const { result } = renderHook(() => {
      useKeyboardBinding({
        id: "help",
        chord: "?",
        label: "Help",
        onTrigger: () => {
          count++
        },
      })
      return useShortcutsEnabled()
    })

    pressKey({ key: "?", code: "Slash", shiftKey: true })
    expect(count).toBe(1)

    act(() => {
      result.current[1](false)
    })
    expect(result.current[0]).toBe(false)
    pressKey({ key: "?", code: "Slash", shiftKey: true })
    expect(count).toBe(1)

    act(() => {
      result.current[1](true)
    })
    pressKey({ key: "?", code: "Slash", shiftKey: true })
    expect(count).toBe(2)
  })

  it("leaves modifier chords live while disabled — Mod+K still fires, so the palette opens", () => {
    let count = 0
    const { result } = renderHook(() => {
      useKeyboardBinding({
        id: "palette",
        chord: "Mod+K",
        label: "Open command palette",
        onTrigger: () => {
          count++
        },
      })
      return useShortcutsEnabled()
    })

    act(() => {
      result.current[1](false)
    })
    pressKey({ key: "k", code: "KeyK", ctrlKey: true })
    expect(count).toBe(1)
  })
})

describe("triggerBinding — the command-palette execute-path", () => {
  it("invokes the registered binding's onTrigger by id", () => {
    let count = 0
    renderHook(() =>
      useKeyboardBinding({
        id: "alpha",
        chord: "Mod+Alt+A",
        label: "Alpha",
        onTrigger: () => {
          count++
        },
      })
    )
    act(() => {
      triggerBinding("alpha")
    })
    expect(count).toBe(1)
  })

  it("is a no-op for an unknown id", () => {
    renderHook(() =>
      useKeyboardBinding({ id: "alpha", chord: "Mod+Alt+A", label: "Alpha", onTrigger: () => {} })
    )
    expect(() =>
      act(() => {
        triggerBinding("nope")
      })
    ).not.toThrow()
  })

  it("fires every binding sharing the id (fire-all parity with key matching)", () => {
    let a = 0
    let b = 0
    renderHook(() => {
      useKeyboardBinding({
        id: "dup",
        chord: "Mod+Alt+A",
        label: "A",
        onTrigger: () => {
          a++
        },
      })
      useKeyboardBinding({
        id: "dup",
        chord: "Mod+Alt+B",
        label: "B",
        onTrigger: () => {
          b++
        },
      })
    })
    act(() => {
      triggerBinding("dup")
    })
    expect(a).toBe(1)
    expect(b).toBe(1)
  })

  it("still runs while shortcuts are disabled (explicit UI invocation is not a keystroke)", () => {
    let count = 0
    const { result } = renderHook(() => {
      useKeyboardBinding({
        id: "alpha",
        chord: "Mod+Alt+A",
        label: "Alpha",
        onTrigger: () => {
          count++
        },
      })
      return useShortcutsEnabled()
    })
    act(() => {
      result.current[1](false)
    })
    act(() => {
      triggerBinding("alpha")
    })
    expect(count).toBe(1)
  })
})

describe("useKeyboardScope — deterministic focus-context scoping", () => {
  it("fires a scoped binding only while focus is inside the scope container", () => {
    let count = 0
    const container = document.createElement("div")
    const inside = document.createElement("button")
    container.appendChild(inside)
    document.body.appendChild(container)

    const { result } = renderHook(() => {
      const scopeRef = useKeyboardScope("editor")
      useKeyboardBinding({
        id: "help",
        chord: "Mod+Alt+H",
        label: "Help",
        scope: "editor",
        onTrigger: () => {
          count++
        },
      })
      return scopeRef
    })

    act(() => {
      result.current(container)
    })

    pressKey({ key: "h", code: "KeyH", ctrlKey: true, altKey: true })
    expect(count).toBe(0)

    inside.focus()
    pressKey({ key: "h", code: "KeyH", ctrlKey: true, altKey: true })
    expect(count).toBe(1)

    container.remove()
  })
})
