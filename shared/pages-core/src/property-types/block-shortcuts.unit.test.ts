import { describe, expect, test } from "bun:test"
import {
  type BlockShortcut,
  type DocumentExtreme,
  matchBlockShortcut,
  matchDocumentExtreme,
  type ShortcutMods,
} from "./block-shortcuts"

function mods(over: Partial<ShortcutMods>): ShortcutMods {
  return { code: "", key: "", meta: false, ctrl: false, shift: false, alt: false, ...over }
}

const TURN_INTO_COMBOS: ReadonlyArray<{ label: string; mod: Partial<ShortcutMods> }> = [
  { label: "mac cmd+opt", mod: { meta: true, alt: true } },
  { label: "win ctrl+shift", mod: { ctrl: true, shift: true } },
]

const TURN_INTO_CASES: ReadonlyArray<{ code: string; expected: BlockShortcut }> = [
  { code: "Digit0", expected: { kind: "turnInto", type: "paragraph" } },
  { code: "Digit1", expected: { kind: "turnInto", type: "heading", level: 1 } },
  { code: "Digit2", expected: { kind: "turnInto", type: "heading", level: 2 } },
  { code: "Digit3", expected: { kind: "turnInto", type: "heading", level: 3 } },
  { code: "Digit4", expected: { kind: "turnInto", type: "to-do" } },
  { code: "Digit5", expected: { kind: "turnInto", type: "bulleted-list-item" } },
  { code: "Digit6", expected: { kind: "turnInto", type: "numbered-list-item" } },
  { code: "Digit8", expected: { kind: "turnInto", type: "code" } },
]

describe("matchBlockShortcut turn-into", () => {
  for (const combo of TURN_INTO_COMBOS) {
    for (const c of TURN_INTO_CASES) {
      test(`${combo.label} + ${c.code} → ${JSON.stringify(c.expected)}`, () => {
        expect(matchBlockShortcut(mods({ ...combo.mod, code: c.code }))).toEqual(c.expected)
      })
    }

    test(`${combo.label} + Digit7 (toggle) does not bind`, () => {
      expect(matchBlockShortcut(mods({ ...combo.mod, code: "Digit7" }))).toBeNull()
    })

    test(`${combo.label} + Digit9 (page) does not bind`, () => {
      expect(matchBlockShortcut(mods({ ...combo.mod, code: "Digit9" }))).toBeNull()
    })
  }

  test("a digit without the turn-into modifier combo does not bind", () => {
    expect(matchBlockShortcut(mods({ code: "Digit1" }))).toBeNull()
    expect(matchBlockShortcut(mods({ meta: true, code: "Digit1" }))).toBeNull()
    expect(matchBlockShortcut(mods({ ctrl: true, code: "Digit1" }))).toBeNull()
  })
})

describe("matchBlockShortcut move", () => {
  test("cmd+shift+ArrowUp → move up", () => {
    expect(matchBlockShortcut(mods({ meta: true, shift: true, key: "ArrowUp" }))).toEqual({
      kind: "move",
      direction: "up",
    })
  })

  test("cmd+shift+ArrowDown → move down", () => {
    expect(matchBlockShortcut(mods({ meta: true, shift: true, key: "ArrowDown" }))).toEqual({
      kind: "move",
      direction: "down",
    })
  })

  test("ctrl+shift+Arrow works on the windows combo too", () => {
    expect(matchBlockShortcut(mods({ ctrl: true, shift: true, key: "ArrowUp" }))).toEqual({
      kind: "move",
      direction: "up",
    })
  })

  test("arrow without the modifier does not move (plain caret navigation)", () => {
    expect(matchBlockShortcut(mods({ key: "ArrowUp" }))).toBeNull()
    expect(matchBlockShortcut(mods({ shift: true, key: "ArrowUp" }))).toBeNull()
  })

  test("cmd+opt+shift+Arrow (alt held) does not move", () => {
    expect(
      matchBlockShortcut(mods({ meta: true, shift: true, alt: true, key: "ArrowUp" }))
    ).toBeNull()
  })
})

describe("matchBlockShortcut duplicate", () => {
  test("cmd+D → duplicate", () => {
    expect(matchBlockShortcut(mods({ meta: true, code: "KeyD" }))).toEqual({ kind: "duplicate" })
  })

  test("ctrl+D → duplicate", () => {
    expect(matchBlockShortcut(mods({ ctrl: true, code: "KeyD" }))).toEqual({ kind: "duplicate" })
  })

  test("cmd+shift+D does not duplicate", () => {
    expect(matchBlockShortcut(mods({ meta: true, shift: true, code: "KeyD" }))).toBeNull()
  })

  test("plain D does not duplicate", () => {
    expect(matchBlockShortcut(mods({ code: "KeyD" }))).toBeNull()
  })
})

describe("matchBlockShortcut non-shortcut keys", () => {
  test("Enter / Backspace / slash never match a block-op shortcut", () => {
    expect(matchBlockShortcut(mods({ key: "Enter", code: "Enter" }))).toBeNull()
    expect(matchBlockShortcut(mods({ key: "Backspace", code: "Backspace" }))).toBeNull()
    expect(matchBlockShortcut(mods({ key: "/", code: "Slash" }))).toBeNull()
  })
})

const DOC_EXTREME_CHORDS: ReadonlyArray<{
  name: string
  mods: Partial<ShortcutMods>
  expected: DocumentExtreme
}> = [
  {
    name: "cmd+Up (mac) → start",
    mods: { meta: true, code: "ArrowUp", key: "ArrowUp" },
    expected: "start",
  },
  {
    name: "cmd+Down (mac) → end",
    mods: { meta: true, code: "ArrowDown", key: "ArrowDown" },
    expected: "end",
  },
  {
    name: "ctrl+Home (win) → start",
    mods: { ctrl: true, code: "Home", key: "Home" },
    expected: "start",
  },
  { name: "ctrl+End (win) → end", mods: { ctrl: true, code: "End", key: "End" }, expected: "end" },
]

describe("matchDocumentExtreme", () => {
  for (const c of DOC_EXTREME_CHORDS) {
    test(c.name, () => {
      expect(matchDocumentExtreme(mods(c.mods))).toBe(c.expected)
    })
  }

  test("bare Home / End (line nav) does NOT jump to a document extreme", () => {
    expect(matchDocumentExtreme(mods({ code: "Home", key: "Home" }))).toBeNull()
    expect(matchDocumentExtreme(mods({ code: "End", key: "End" }))).toBeNull()
  })

  test("plain Arrow (caret nav) does NOT jump", () => {
    expect(matchDocumentExtreme(mods({ code: "ArrowUp", key: "ArrowUp" }))).toBeNull()
    expect(matchDocumentExtreme(mods({ code: "ArrowDown", key: "ArrowDown" }))).toBeNull()
  })

  test("shift-extend is deferred — shift+cmd+Up does NOT jump (native in-block extend wins)", () => {
    expect(
      matchDocumentExtreme(mods({ meta: true, shift: true, code: "ArrowUp", key: "ArrowUp" }))
    ).toBeNull()
  })

  test("alt held → no jump", () => {
    expect(
      matchDocumentExtreme(mods({ meta: true, alt: true, code: "ArrowUp", key: "ArrowUp" }))
    ).toBeNull()
  })
})

const L0_NATIVE_CHORDS: ReadonlyArray<{ name: string; mods: Partial<ShortcutMods> }> = [
  { name: "cmd+C copy", mods: { meta: true, code: "KeyC", key: "c" } },
  { name: "ctrl+C copy", mods: { ctrl: true, code: "KeyC", key: "c" } },
  { name: "cmd+V paste", mods: { meta: true, code: "KeyV", key: "v" } },
  { name: "ctrl+V paste", mods: { ctrl: true, code: "KeyV", key: "v" } },
  { name: "cmd+X cut", mods: { meta: true, code: "KeyX", key: "x" } },
  { name: "ctrl+X cut", mods: { ctrl: true, code: "KeyX", key: "x" } },
  { name: "cmd+Z undo", mods: { meta: true, code: "KeyZ", key: "z" } },
  { name: "ctrl+Z undo", mods: { ctrl: true, code: "KeyZ", key: "z" } },
  { name: "shift+cmd+Z redo (mac)", mods: { meta: true, shift: true, code: "KeyZ", key: "z" } },
  { name: "ctrl+Y redo (win)", mods: { ctrl: true, code: "KeyY", key: "y" } },
  { name: "shift+ctrl+Z redo (win)", mods: { ctrl: true, shift: true, code: "KeyZ", key: "z" } },
  { name: "cmd+A select-all", mods: { meta: true, code: "KeyA", key: "a" } },
  { name: "ctrl+A select-all", mods: { ctrl: true, code: "KeyA", key: "a" } },
  { name: "cmd+S save", mods: { meta: true, code: "KeyS", key: "s" } },
  { name: "ctrl+S save", mods: { ctrl: true, code: "KeyS", key: "s" } },
  { name: "cmd+F find", mods: { meta: true, code: "KeyF", key: "f" } },
  { name: "ctrl+F find", mods: { ctrl: true, code: "KeyF", key: "f" } },
  { name: "cmd+Left line-start (mac)", mods: { meta: true, code: "ArrowLeft", key: "ArrowLeft" } },
  { name: "cmd+Right line-end (mac)", mods: { meta: true, code: "ArrowRight", key: "ArrowRight" } },
  { name: "Home line-start (win)", mods: { code: "Home", key: "Home" } },
  { name: "End line-end (win)", mods: { code: "End", key: "End" } },
  { name: "opt+Left word-left (mac)", mods: { alt: true, code: "ArrowLeft", key: "ArrowLeft" } },
  {
    name: "opt+Right word-right (mac)",
    mods: { alt: true, code: "ArrowRight", key: "ArrowRight" },
  },
  { name: "ctrl+Left word-left (win)", mods: { ctrl: true, code: "ArrowLeft", key: "ArrowLeft" } },
  {
    name: "ctrl+Right word-right (win)",
    mods: { ctrl: true, code: "ArrowRight", key: "ArrowRight" },
  },
  { name: "shift+ArrowUp extend", mods: { shift: true, code: "ArrowUp", key: "ArrowUp" } },
  { name: "shift+ArrowLeft extend", mods: { shift: true, code: "ArrowLeft", key: "ArrowLeft" } },
  {
    name: "shift+cmd+Left extend-line (mac)",
    mods: { meta: true, shift: true, code: "ArrowLeft", key: "ArrowLeft" },
  },
  {
    name: "shift+ctrl+Left extend-word (win)",
    mods: { ctrl: true, shift: true, code: "ArrowLeft", key: "ArrowLeft" },
  },
]

describe("L0 Reserved keys are never intercepted by a caret-mode house matcher", () => {
  for (const c of L0_NATIVE_CHORDS) {
    test(`matchBlockShortcut ignores ${c.name}`, () => {
      expect(matchBlockShortcut(mods(c.mods))).toBeNull()
    })
    test(`matchDocumentExtreme ignores ${c.name}`, () => {
      expect(matchDocumentExtreme(mods(c.mods))).toBeNull()
    })
  }

  for (const c of DOC_EXTREME_CHORDS) {
    test(`matchBlockShortcut ignores the doc-extreme chord ${c.name}`, () => {
      expect(matchBlockShortcut(mods(c.mods))).toBeNull()
    })
  }
})
