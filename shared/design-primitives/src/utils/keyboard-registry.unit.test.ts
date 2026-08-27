import { describe, expect, it } from "bun:test"
import {
  formatChord,
  isCharacterKeyChord,
  type KeyBinding,
  type KeyEventFacts,
  matchBindings,
  matchesChord,
  parseChord,
  resolveMod,
  selectBindingsById,
} from "./keyboard-registry"

function facts(overrides: Partial<KeyEventFacts> = {}): KeyEventFacts {
  return {
    key: "t",
    code: "KeyT",
    metaKey: false,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    inTextInput: false,
    ...overrides,
  }
}

function binding(overrides: Partial<KeyBinding> = {}): KeyBinding {
  return { id: "test", chord: "Mod+Alt+T", label: "Test", onTrigger: () => {}, ...overrides }
}

describe("parseChord", () => {
  it("parses a Mod+Alt+letter chord", () => {
    expect(parseChord("Mod+Alt+T")).toEqual({
      key: "t",
      mod: true,
      ctrl: false,
      meta: false,
      alt: true,
      shift: false,
    })
  })

  it("parses explicit Ctrl / Cmd modifiers and named keys", () => {
    expect(parseChord("Ctrl+Shift+Enter")).toEqual({
      key: "enter",
      mod: false,
      ctrl: true,
      meta: false,
      alt: false,
      shift: true,
    })
    expect(parseChord("Cmd+K")).toEqual({
      key: "k",
      mod: false,
      ctrl: false,
      meta: true,
      alt: false,
      shift: false,
    })
  })

  it("parses a lone symbol key", () => {
    expect(parseChord("?")).toEqual({
      key: "?",
      mod: false,
      ctrl: false,
      meta: false,
      alt: false,
      shift: false,
    })
  })

  it("is case-insensitive across modifier and key tokens", () => {
    expect(parseChord("mod+alt+t")).toEqual(parseChord("Mod+Alt+T"))
  })
})

describe("resolveMod", () => {
  it("maps mac -> meta and other -> ctrl (the one canonical Mod resolution)", () => {
    expect(resolveMod("mac")).toBe("meta")
    expect(resolveMod("other")).toBe("ctrl")
  })
})

describe("isCharacterKeyChord — the WCAG 2.1.4 scope predicate", () => {
  it("is true for a bare printable character (letter, symbol)", () => {
    expect(isCharacterKeyChord(parseChord("t"))).toBe(true)
    expect(isCharacterKeyChord(parseChord("?"))).toBe(true)
  })

  it("is true for a shifted character — Shift does not exempt a chord", () => {
    expect(isCharacterKeyChord(parseChord("Shift+/"))).toBe(true)
  })

  it("is false for any modifier chord — adding a modifier is WCAG's own remap remedy", () => {
    expect(isCharacterKeyChord(parseChord("Mod+K"))).toBe(false)
    expect(isCharacterKeyChord(parseChord("Ctrl+X"))).toBe(false)
    expect(isCharacterKeyChord(parseChord("Alt+T"))).toBe(false)
    expect(isCharacterKeyChord(parseChord("Mod+Alt+A"))).toBe(false)
  })
})

describe("matchesChord — per-OS Mod resolution", () => {
  const chord = parseChord("Mod+Alt+T")

  it("resolves Mod to Cmd (meta) on mac, never Ctrl", () => {
    expect(matchesChord(chord, facts({ metaKey: true, altKey: true }), "mac")).toBe(true)
    expect(matchesChord(chord, facts({ ctrlKey: true, altKey: true }), "mac")).toBe(false)
  })

  it("resolves Mod to Ctrl on Windows/Linux, never Meta", () => {
    expect(matchesChord(chord, facts({ ctrlKey: true, altKey: true }), "other")).toBe(true)
    expect(matchesChord(chord, facts({ metaKey: true, altKey: true }), "other")).toBe(false)
  })

  it("matches a letter by physical code, immune to Option-produced characters on mac", () => {
    expect(
      matchesChord(chord, facts({ key: "†", code: "KeyT", metaKey: true, altKey: true }), "mac")
    ).toBe(true)
  })

  it("requires every declared modifier to be held", () => {
    expect(matchesChord(chord, facts({ ctrlKey: true, altKey: false }), "other")).toBe(false)
  })
})

describe("matchBindings — structural WCAG 2.1.4 floor + focus scoping", () => {
  const ctx = { os: "other" as const, shortcutsEnabled: true, activeScopes: new Set<string>() }
  const modAltT = facts({ ctrlKey: true, altKey: true })

  it("returns a matching binding", () => {
    const b = binding()
    const matched = matchBindings(modAltT, [b], ctx)
    expect(matched).toHaveLength(1)
    expect(matched[0]).toBe(b)
  })

  it("global disable-toggle suppresses character-key bindings (the 2.1.4 'turn it off' remedy)", () => {
    const help = binding({ id: "help", chord: "?" })
    const helpKey = facts({ key: "?", code: "Slash", shiftKey: true })
    expect(matchBindings(helpKey, [help], { ...ctx, shortcutsEnabled: true })).toHaveLength(1)
    expect(matchBindings(helpKey, [help], { ...ctx, shortcutsEnabled: false })).toHaveLength(0)

    const bare = binding({ id: "bare", chord: "t" })
    expect(matchBindings(facts(), [bare], { ...ctx, shortcutsEnabled: false })).toHaveLength(0)
  })

  it("global disable-toggle leaves MODIFIER chords live — Mod+K survives, so the palette does", () => {
    const palette = binding({ id: "palette", chord: "Mod+K" })
    const modK = facts({ key: "k", code: "KeyK", ctrlKey: true })
    expect(matchBindings(modK, [palette], { ...ctx, shortcutsEnabled: false })).toHaveLength(1)
    expect(matchBindings(modK, [palette], { ...ctx, shortcutsEnabled: true })).toHaveLength(1)
  })

  it("the disabled gate composes with every other filter (scope still narrows a live chord)", () => {
    const scoped = binding({ id: "scoped", chord: "Mod+K", scope: "editor" })
    const modK = facts({ key: "k", code: "KeyK", ctrlKey: true })
    const off = { ...ctx, shortcutsEnabled: false }
    expect(matchBindings(modK, [scoped], off)).toHaveLength(0)
    expect(
      matchBindings(modK, [scoped], { ...off, activeScopes: new Set(["editor"]) })
    ).toHaveLength(1)
  })

  it("typing-guard suppresses shortcuts while a text input is focused unless opted in", () => {
    const typing = facts({ ctrlKey: true, altKey: true, inTextInput: true })
    expect(matchBindings(typing, [binding()], ctx)).toHaveLength(0)
    expect(matchBindings(typing, [binding({ allowInTextInput: true })], ctx)).toHaveLength(1)
  })

  it("focus-scoping: a scoped binding fires only when its scope holds focus", () => {
    const scoped = binding({ id: "help", chord: "?", scope: "editor" })
    const helpKey = facts({ key: "?", code: "Slash", shiftKey: true })
    expect(matchBindings(helpKey, [scoped], { ...ctx, activeScopes: new Set() })).toHaveLength(0)
    expect(
      matchBindings(helpKey, [scoped], { ...ctx, activeScopes: new Set(["editor"]) })
    ).toHaveLength(1)
  })

  it("fire-all: every binding matching the same chord is returned (many-panel-toggle case)", () => {
    const bindings = [binding({ id: "a" }), binding({ id: "b" }), binding({ id: "c" })]
    expect(matchBindings(modAltT, bindings, ctx)).toHaveLength(3)
  })

  it("skips a binding disabled via enabled:false", () => {
    expect(matchBindings(modAltT, [binding({ enabled: false })], ctx)).toHaveLength(0)
  })
})

describe("formatChord — per-OS self-documenting display", () => {
  const chord = parseChord("Mod+Alt+T")

  it("renders mac glyphs and Windows/Linux text from one declaration", () => {
    expect(formatChord(chord, "mac")).toBe("⌥⌘T")
    expect(formatChord(chord, "other")).toBe("Ctrl+Alt+T")
  })
})

describe("selectBindingsById — the command-palette execute path", () => {
  it("returns the binding whose id matches", () => {
    const alpha = binding({ id: "alpha" })
    const beta = binding({ id: "beta" })
    const selected = selectBindingsById("alpha", [alpha, beta])
    expect(selected).toHaveLength(1)
    expect(selected[0]).toBe(alpha)
  })

  it("fire-all: every registration sharing the id is returned (parity with key matching)", () => {
    const one = binding({ id: "dup" })
    const two = binding({ id: "dup" })
    expect(selectBindingsById("dup", [one, two, binding({ id: "other" })])).toHaveLength(2)
  })

  it("returns empty for an unknown id", () => {
    expect(selectBindingsById("nope", [binding({ id: "alpha" })])).toHaveLength(0)
  })

  it("skips a binding disabled via enabled:false", () => {
    expect(selectBindingsById("alpha", [binding({ id: "alpha", enabled: false })])).toHaveLength(0)
  })

  it("takes no enabled-state argument — explicit UI invocation is not a keystroke", () => {
    expect(selectBindingsById).toHaveLength(2)
  })
})
