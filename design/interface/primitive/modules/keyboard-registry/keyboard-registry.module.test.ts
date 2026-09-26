import { expect, test } from "bun:test"
import {
  describeBindings,
  type KeyBinding,
  type KeyEventFacts,
  matchBindings,
} from "akasha/design/interface/primitive/modules/keyboard-registry/keyboard-registry.module.code.ts"

function chordedAs(id: string, chord: string, label: string): KeyBinding {
  return { id, chord, label, onTrigger: () => undefined }
}

const OPEN = { os: "other", shortcutsEnabled: true, activeScopes: new Set<string>() } as const

function pressed(key: string, code: string): KeyEventFacts {
  return {
    key,
    code,
    metaKey: false,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    inTextInput: false,
  }
}

function met(chord: string, key: string, code: string): boolean {
  return matchBindings(pressed(key, code), [chordedAs("one", chord, "one")], OPEN).length === 1
}

test("A digit chord is met by that digit's key on the top row or on the number pad.", () => {
  expect(met("7", "7", "Digit7")).toBe(true)
  expect(met("7", "7", "Numpad7")).toBe(true)
  expect(met("7", "8", "Numpad8")).toBe(false)
})

test("A key on the number pad is read by where it sits, whatever Num Lock says.", () => {
  expect(met("7", "Home", "Numpad7")).toBe(true)
  expect(met("0", "Insert", "Numpad0")).toBe(true)
})

test("The chord `Space` is met by the space bar.", () => {
  expect(met("Space", " ", "Space")).toBe(true)
  expect(met("Space", "s", "KeyS")).toBe(false)
  expect(describeBindings([chordedAs("skip", "Space", "Skip")], "other")[0]?.display).toBe("Space")
})

test("two registrations of one id are described once", () => {
  const described = describeBindings(
    [
      chordedAs("panel.toggle-all", "Mod+Alt+T", "Expand / collapse all panels"),
      chordedAs("panel.toggle-all", "Mod+Alt+T", "Expand / collapse all panels"),
    ],
    "other"
  )
  expect(described).toHaveLength(1)
  expect(described[0]?.display).toBe("Ctrl+Alt+T")
})

test("the last registration of an id describes it, and the first sets where it sits", () => {
  const described = describeBindings(
    [
      chordedAs("house.command-palette", "Mod+K", "Open command palette"),
      chordedAs("panel.toggle-all", "Mod+Alt+T", "mounted first"),
      chordedAs("house.shortcut-sheet", "?", "Show keyboard shortcuts"),
      chordedAs("panel.toggle-all", "Mod+Alt+T", "mounted last"),
    ],
    "other"
  )
  expect(described.map((one) => one.id)).toEqual([
    "house.command-palette",
    "panel.toggle-all",
    "house.shortcut-sheet",
  ])
  expect(described[1]?.label).toBe("mounted last")
})
