import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import {
  CALORIES_TO_THE_POINT,
  enduranceIn,
  fetchEndurancePoints,
  trackingOn,
} from "./attribute-endurance.readout.code.ts"

const DAY = "2026-09-01"

const held = (figure: unknown) => ({ "active-calories": figure })

test("the day asked for is the tracking day the caller named", () => {
  const query = trackingOn(DAY) as Record<string, unknown>
  expect(query["page-type"]).toBe("daily-tracking")
  expect(query.where).toEqual({ date: { is: DAY } })
  expect(query.limit).toBe(1)
})

test("the one figure the reading is taken from is the key asked for", () => {
  expect((trackingOn(DAY) as Record<string, unknown>).keys).toEqual(["active-calories"])
})

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

test("no tracking day is no reading rather than an endurance of zero", async () => {
  expect(await fetchEndurancePoints(answering([]), DAY)).toBeNull()
})

test("the figure of the day asked for is the reading", async () => {
  expect(await fetchEndurancePoints(answering([{ values: held(400) }]), DAY)).toBeCloseTo(1, 10)
})

test("a tracking day carrying no figure is no reading over the whole reach", async () => {
  expect(await fetchEndurancePoints(answering([{ values: held(null) }]), DAY)).toBeNull()
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(
    fetchEndurancePoints(refusing("the index holds no such page type"), DAY)
  ).rejects.toThrow("unknown rather than nothing")
})
