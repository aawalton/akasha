import { expect, test } from "bun:test"
import {
  adoptConfig,
  keybindingsIn,
  sameBindings,
} from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-config-adopt/keybinder-config-adopt.module.code.ts"

const NONE = { keyCode: 0, mod1: 0, mod2: 0, mod3: 0, mod4: 0 }

const HOME = { keyCode: 17, mod1: 0, mod2: 0, mod3: 0, mod4: 0 }

const END = { keyCode: 16, mod1: 0, mod2: 0, mod3: 0, mod4: 0 }

const PORT = "PORTTOFRIENDSHOUSE_FAV_MYHOUSE_INSIDE_1"

const CHANGED_AT = 1793223753

function config(shared: boolean, bindings = [HOME, NONE, NONE, NONE]) {
  return { [PORT]: { shared, changedAt: CHANGED_AT, bindings } }
}

test("the config the watcher wrote answers its keybindings", () => {
  expect(keybindingsIn({ version: 1, keybindings: config(true) })).toEqual(config(true))
  expect(keybindingsIn({ version: 1 })).toBeUndefined()
  expect(keybindingsIn(undefined)).toBeUndefined()
})

test("a missing slot reads as no key", () => {
  expect(sameBindings([HOME], [HOME, NONE, NONE, NONE])).toBe(true)
  expect(sameBindings([HOME], [END])).toBe(false)
})

test("a page's binding the game holds otherwise is taken onto the shared bindings", () => {
  const shared = { [PORT]: [END, NONE, NONE, NONE] }
  expect(adoptConfig(config(true), shared, {})).toBe(1)
  expect(shared[PORT]).toEqual([HOME, NONE, NONE, NONE])
})

test("a page's binding the game already holds changes nothing", () => {
  const shared = { [PORT]: [HOME, NONE, NONE, NONE] }
  expect(adoptConfig(config(true), shared, {})).toBe(0)
})

test("a key rebound in the game after the page changed keeps the game's key", () => {
  const shared = { [PORT]: [END, NONE, NONE, NONE] }
  const changes = {
    [PORT]: { at: CHANGED_AT + 1, shared: true, bindings: [END, NONE, NONE, NONE] },
  }
  expect(adoptConfig(config(true), shared, changes)).toBe(0)
  expect(shared[PORT]).toEqual([END, NONE, NONE, NONE])
})

test("a key rebound in the game before the page changed takes the page's key", () => {
  const shared = { [PORT]: [END, NONE, NONE, NONE] }
  const changes = { [PORT]: { at: CHANGED_AT, shared: true, bindings: [END, NONE, NONE, NONE] } }
  expect(adoptConfig(config(true), shared, changes)).toBe(1)
  expect(shared[PORT]).toEqual([HOME, NONE, NONE, NONE])
})

test("a page no longer shared stops its action being written onto characters", () => {
  const shared: Record<string, (typeof NONE)[] | undefined> = { [PORT]: [HOME, NONE, NONE, NONE] }
  expect(adoptConfig(config(false), shared, {})).toBe(1)
  expect(shared[PORT]).toBeUndefined()
})

test("the shared bindings take a copy rather than the config's own table", () => {
  const held = config(true)
  const shared: Record<string, (typeof NONE)[] | undefined> = {}
  adoptConfig(held, shared, {})
  expect(shared[PORT]).not.toBe(held[PORT]?.bindings)
})
