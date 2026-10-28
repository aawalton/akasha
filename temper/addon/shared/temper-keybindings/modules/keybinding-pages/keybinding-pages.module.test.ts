import { expect, test } from "bun:test"
import { parsedIn } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  gameBindingsOf,
  type Keybinding,
  keybindingOf,
  keybindingPagePath,
  keybindingPageText,
  keybindingsConfigOf,
  pageBindingsOf,
  plainlyNamed,
} from "akasha/temper/addon/shared/temper-keybindings/modules/keybinding-pages/keybinding-pages.module.code.ts"

const NONE = { keyCode: 0, mod1: 0, mod2: 0, mod3: 0, mod4: 0 }

const HOME = { keyCode: 17, mod1: 0, mod2: 0, mod3: 0, mod4: 0 }

const CTRL_SHIFT_F = { keyCode: 37, mod1: 4, mod2: 0, mod3: 7, mod4: 0 }

const PORT_HOME: Keybinding = {
  key: "PORTTOFRIENDSHOUSE_FAV_MYHOUSE_INSIDE_1",
  bindings: [{ slot: 1, key: "KEY_HOME" }],
  shared: true,
  changedAt: "2026-10-28T21:29:00.000Z",
}

test("a slot holding no key is left out and a key is named by its constant", () => {
  expect(pageBindingsOf([HOME, NONE, NONE, NONE])).toEqual([{ slot: 1, key: "KEY_HOME" }])
})

test("the modifiers held with a key are named in the game's order", () => {
  expect(pageBindingsOf([NONE, CTRL_SHIFT_F, NONE, NONE])).toEqual([
    { slot: 2, key: "KEY_F", modifiers: ["KEY_CTRL", "KEY_SHIFT"] },
  ])
})

test("the game's four slots come back from the bindings a page names", () => {
  const slots = [HOME, CTRL_SHIFT_F, NONE, { ...NONE, keyCode: 133 }]
  expect(gameBindingsOf(pageBindingsOf(slots))).toEqual(slots)
})

test("an action's page is named by its action in lower kebab case", () => {
  expect(keybindingPagePath(PORT_HOME.key)).toContain("/porttofriendshouse-fav-myhouse-inside-1.")
  expect(keybindingPagePath("TOGGLE_MAP")).toBe(
    "temper/addon/shared/temper-keybindings/temper-keybinding/pages/toggle-map.temper-keybinding.ts"
  )
})

test("a layer or category is named plainly, its color codes dropped", () => {
  expect(plainlyNamed("|cFFAA00Temper Items|r")).toBe("temper-items")
  expect(plainlyNamed("")).toBeUndefined()
})

test("a page written for a keybinding reads back as that keybinding", () => {
  const page = parsedIn(
    keybindingPageText(PORT_HOME, { id: "01a18478-0000-7000-8000-000000000000" })
  )
  expect(keybindingOf(page)).toEqual(PORT_HOME)
})

test("the config states each action's four slots and when it changed in seconds", () => {
  expect(keybindingsConfigOf([PORT_HOME])).toEqual({
    PORTTOFRIENDSHOUSE_FAV_MYHOUSE_INSIDE_1: {
      shared: true,
      changedAt: 1793222940,
      bindings: [HOME, NONE, NONE, NONE],
    },
  })
})

test("a page the store answers with nulls for what it states nothing of reads as stating nothing", () => {
  const stored = { ...PORT_HOME, title: null, layer: null, category: null }
  expect(keybindingOf(stored)).toEqual(PORT_HOME)
})

test("a page naming a key the game does not is refused", () => {
  expect(() =>
    keybindingsConfigOf([{ ...PORT_HOME, bindings: [{ slot: 1, key: "KEY_HOOM" }] }])
  ).toThrow()
})
