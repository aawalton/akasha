import { expect, test } from "bun:test"
import { POUNDS_TO_THE_POINT, strengthIn } from "./strength.attribute.code.ts"

const held = (figure: unknown) => ({ "strength-volume": figure })

test("the points are the figure over the amount one point costs", () => {
  expect(POUNDS_TO_THE_POINT).toBe(2204.62)
  expect(strengthIn(held(2204.62))).toBeCloseTo(1, 10)
  expect(strengthIn(held(2204.62 * 2))).toBeCloseTo(2, 10)
})

test("a figure given as text is read as the number that text spells", () => {
  expect(strengthIn(held(String(2204.62)))).toBeCloseTo(1, 10)
})

test("points of zero are points rather than absent ones", () => {
  expect(strengthIn(held(0))).toBe(0)
  expect(strengthIn(held("0"))).toBe(0)
})

test("a day carrying no figure earns nothing rather than a strength of zero", () => {
  expect(strengthIn({})).toBeNull()
  expect(strengthIn(held(null))).toBeNull()
  expect(strengthIn(held(undefined))).toBeNull()
  expect(strengthIn(held(""))).toBeNull()
  expect(strengthIn(held("   "))).toBeNull()
  expect(strengthIn(held("soon"))).toBeNull()
})
