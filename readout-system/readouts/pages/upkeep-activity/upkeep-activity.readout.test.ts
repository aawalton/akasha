import { expect, test } from "bun:test"
import { activityIn, heldNothing, POUNDS_TO_THE_CALORIE } from "./upkeep-activity.readout.code.ts"

const held = (cardio: unknown, lifted: unknown = null) => ({
  "active-calories": cardio,
  "strength-volume": lifted,
})

test("a figure given as text is read as the number it spells", () => {
  expect(activityIn(held("120"))).toBe(120)
  expect(activityIn(held(120))).toBe(120)
  expect(activityIn(held("12.5"))).toBe(12.5)
})

test("a day's lifting counts at seven pounds to the calorie", () => {
  expect(POUNDS_TO_THE_CALORIE).toBe(7)
  expect(activityIn(held(null, 70))).toBe(10)
  expect(activityIn(held("30", "70"))).toBe(40)
})

test("a day carrying one half alone is a reading of that half", () => {
  expect(activityIn(held("30"))).toBe(30)
  expect(activityIn(held(undefined, "70"))).toBe(10)
})

test("an activity of zero is a reading rather than an absent one", () => {
  expect(activityIn(held("0"))).toBe(0)
  expect(activityIn(held(0, 0))).toBe(0)
})

test("a day carrying neither half has held nothing to add", () => {
  expect(heldNothing({})).toBe(true)
  expect(heldNothing(held(null, null))).toBe(true)
  expect(heldNothing(held("", "   "))).toBe(true)
  expect(heldNothing(held("soon"))).toBe(true)
  expect(heldNothing(held("0"))).toBe(false)
  expect(heldNothing(held(null, 0))).toBe(false)
})

test("the zero two absent halves add to is no reading rather than an activity of zero", () => {
  expect(activityIn({})).toBeNull()
  expect(activityIn(held(null, null))).toBeNull()
  expect(activityIn(held("soon"))).toBeNull()
})
