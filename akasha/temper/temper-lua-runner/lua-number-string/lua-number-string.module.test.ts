import { expect, test } from "bun:test"
import { luaNumberString } from "./lua-number-string.module.code.ts"

test("a whole number is written with no fractional part", () => {
  expect(luaNumberString(0)).toBe("0")
  expect(luaNumberString(42)).toBe("42")
  expect(luaNumberString(-7)).toBe("-7")
})

test("a fraction fourteen digits keep is written to fourteen", () => {
  expect(luaNumberString(0.5)).toBe("0.5")
  expect(luaNumberString(0.1)).toBe("0.1")
  expect(luaNumberString(-1.25)).toBe("-1.25")
})

test("seventeen digits are used where fourteen lose the number", () => {
  expect(luaNumberString(1 / 3)).toBe("0.33333333333333331")
  expect(Number(luaNumberString(0.1 + 0.2))).toBe(0.1 + 0.2)
})

test("an exponent is written with a sign and at least two digits", () => {
  expect(luaNumberString(1e-7)).toBe("1e-07")
  expect(luaNumberString(1.5e20)).toBe("1.5e+20")
})

test("a number too large to be whole in a double is written as an exponent", () => {
  expect(luaNumberString(2 ** 60)).toBe("1.152921504606847e+18")
})
