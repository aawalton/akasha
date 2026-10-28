import { expect, test } from "bun:test"
import {
  KEY_CODES,
  keyCodeOf,
  keyNameOf,
  NO_KEY,
} from "akasha/temper/addon/shared/temper-keybindings/modules/keybinding-key-codes/keybinding-key-codes.module.code.ts"

test("the Home key's code is the one the game gives KEY_HOME", () => {
  expect(keyNameOf(17)).toBe("KEY_HOME")
  expect(keyCodeOf("KEY_HOME")).toBe(17)
})

test("every code from one to the last key is named once", () => {
  const codes = Object.values(KEY_CODES).sort((one, other) => one - other)
  expect(codes).toEqual(Array.from({ length: 193 }, (_, at) => at + 1))
})

test("the code for no key names no key", () => {
  expect(() => keyNameOf(NO_KEY)).toThrow()
})

test("a name the game gives no key is refused", () => {
  expect(() => keyCodeOf("KEY_ITERATION_END")).toThrow()
})
