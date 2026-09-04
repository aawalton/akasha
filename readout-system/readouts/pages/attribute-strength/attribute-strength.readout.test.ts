import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import {
  fetchStrengthPoints,
  POUNDS_TO_THE_POINT,
  strengthIn,
  trackingOn,
} from "./attribute-strength.readout.code.ts"

const DAY = "2026-09-01"

const held = (figure: unknown) => ({ "strength-volume": figure })

test("the day asked for is the tracking day the caller named", () => {
  const query = trackingOn(DAY) as Record<string, unknown>
  expect(query["page-type"]).toBe("daily-tracking")
  expect(query.where).toEqual({ date: { is: DAY } })
  expect(query.limit).toBe(1)
})

test("the one figure the reading is taken from is the key asked for", () => {
  expect((trackingOn(DAY) as Record<string, unknown>).keys).toEqual(["strength-volume"])
})

test("the reading is the figure over the amount one point costs", () => {
  expect(POUNDS_TO_THE_POINT).toBe(2204.62)
  expect(strengthIn(held(2204.62))).toBeCloseTo(1, 10)
  expect(strengthIn(held(2204.62 * 2))).toBeCloseTo(2, 10)
})

test("a figure given as text is read as the number that text spells", () => {
  expect(strengthIn(held(String(2204.62)))).toBeCloseTo(1, 10)
})

test("a reading of zero is a reading rather than an absent one", () => {
  expect(strengthIn(held(0))).toBe(0)
  expect(strengthIn(held("0"))).toBe(0)
})

test("a day carrying no figure is no reading rather than a strength of zero", () => {
  expect(strengthIn({})).toBeNull()
  expect(strengthIn(held(null))).toBeNull()
  expect(strengthIn(held(undefined))).toBeNull()
  expect(strengthIn(held(""))).toBeNull()
  expect(strengthIn(held("   "))).toBeNull()
  expect(strengthIn(held("soon"))).toBeNull()
})

test("no tracking day is no reading rather than a strength of zero", async () => {
  expect(await fetchStrengthPoints(answering([]), DAY)).toBeNull()
})

test("the figure of the day asked for is the reading", async () => {
  expect(await fetchStrengthPoints(answering([{ values: held(2204.62) }]), DAY)).toBeCloseTo(1, 10)
})

test("a tracking day carrying no figure is no reading over the whole reach", async () => {
  expect(await fetchStrengthPoints(answering([{ values: held(null) }]), DAY)).toBeNull()
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(
    fetchStrengthPoints(refusing("the index holds no such page type"), DAY)
  ).rejects.toThrow("unknown rather than nothing")
})
