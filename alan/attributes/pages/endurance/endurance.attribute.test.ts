import { expect, test } from "bun:test"
import { CALORIES_TO_THE_POINT, enduranceIn } from "./endurance.attribute.code.ts"

const held = (figure: unknown) => ({ "active-calories": figure })

test("the points are the figure over the amount one point costs", () => {
  expect(CALORIES_TO_THE_POINT).toBe(200)
  expect(enduranceIn(held(200))).toBeCloseTo(1, 10)
  expect(enduranceIn(held(200 * 2))).toBeCloseTo(2, 10)
})

test("a figure given as text is read as the number that text spells", () => {
  expect(enduranceIn(held(String(200)))).toBeCloseTo(1, 10)
})

test("points of zero are points rather than absent ones", () => {
  expect(enduranceIn(held(0))).toBe(0)
  expect(enduranceIn(held("0"))).toBe(0)
})

test("a day carrying no figure earns nothing rather than an endurance of zero", () => {
  expect(enduranceIn({})).toBeNull()
  expect(enduranceIn(held(null))).toBeNull()
  expect(enduranceIn(held(undefined))).toBeNull()
  expect(enduranceIn(held(""))).toBeNull()
  expect(enduranceIn(held("   "))).toBeNull()
  expect(enduranceIn(held("soon"))).toBeNull()
})
