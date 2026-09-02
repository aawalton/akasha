import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import {
  activityIn,
  fetchActivityCalories,
  heldNothing,
  POUNDS_TO_THE_CALORIE,
  trackingOn,
} from "./upkeep-activity.readout.code.ts"

const DAY = "2026-09-01"

const held = (cardio: unknown, lifted: unknown = null) => ({
  "active-calories": cardio,
  "strength-volume": lifted,
})

test("the day asked for is the tracking day the caller named", () => {
  const query = trackingOn(DAY) as Record<string, unknown>
  expect(query["page-type"]).toBe("daily-tracking")
  expect(query.where).toEqual({ date: { is: DAY } })
  expect(query.limit).toBe(1)
})

test("the two halves of the sum are the keys asked for", () => {
  expect((trackingOn(DAY) as Record<string, unknown>).keys).toEqual([
    "active-calories",
    "strength-volume",
  ])
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

test("no tracking day is no reading rather than an activity of zero", async () => {
  expect(await fetchActivityCalories(answering([]), DAY)).toBeNull()
})

test("the activity of the day asked for is the reading", async () => {
  expect(await fetchActivityCalories(answering([{ values: held("30", "70") }]), DAY)).toBe(40)
})

test("a tracking day holding neither half is no reading over the whole reach", async () => {
  expect(await fetchActivityCalories(answering([{ values: held(null, null) }]), DAY)).toBeNull()
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(
    fetchActivityCalories(refusing("the index holds no such page type"), DAY)
  ).rejects.toThrow("unknown rather than nothing")
})
