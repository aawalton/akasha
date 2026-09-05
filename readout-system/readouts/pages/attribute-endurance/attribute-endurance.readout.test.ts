import { expect, test } from "bun:test"
import { CALORIES_TO_THE_POINT, enduranceIn } from "./attribute-endurance.readout.code.ts"

const held = (figure: unknown) => ({ "active-calories": figure })

test("the reading is the figure over the amount one point costs", () => {
  expect(CALORIES_TO_THE_POINT).toBe(400)
  expect(enduranceIn(held(400))).toBeCloseTo(1, 10)
  expect(enduranceIn(held(400 * 2))).toBeCloseTo(2, 10)
})

test("a figure given as text is read as the number that text spells", () => {
  expect(enduranceIn(held(String(400)))).toBeCloseTo(1, 10)
})

test("a reading of zero is a reading rather than an absent one", () => {
  expect(enduranceIn(held(0))).toBe(0)
  expect(enduranceIn(held("0"))).toBe(0)
})

test("a day carrying no figure is no reading rather than an endurance of zero", () => {
  expect(enduranceIn({})).toBeNull()
  expect(enduranceIn(held(null))).toBeNull()
  expect(enduranceIn(held(undefined))).toBeNull()
  expect(enduranceIn(held(""))).toBeNull()
  expect(enduranceIn(held("   "))).toBeNull()
  expect(enduranceIn(held("soon"))).toBeNull()
})
