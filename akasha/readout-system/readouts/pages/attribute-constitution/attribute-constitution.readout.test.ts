import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import {
  constitutionIn,
  fetchConstitutionPoints,
  GRAMS_TO_THE_POINT,
  trackingOn,
} from "./attribute-constitution.readout.code.ts"

const DAY = "2026-09-01"

const held = (figure: unknown) => ({ "nutrition-points": figure })

test("the day asked for is the tracking day the caller named", () => {
  const query = trackingOn(DAY) as Record<string, unknown>
  expect(query["page-type"]).toBe("daily-tracking")
  expect(query.where).toEqual({ date: { is: DAY } })
  expect(query.limit).toBe(1)
})

test("the one figure the reading is taken from is the key asked for", () => {
  expect((trackingOn(DAY) as Record<string, unknown>).keys).toEqual(["nutrition-points"])
})

test("the reading is the figure over the amount one point costs", () => {
  expect(GRAMS_TO_THE_POINT).toBe(100)
  expect(constitutionIn(held(100))).toBeCloseTo(1, 10)
  expect(constitutionIn(held(100 * 2))).toBeCloseTo(2, 10)
})

test("a figure given as text is read as the number that text spells", () => {
  expect(constitutionIn(held(String(100)))).toBeCloseTo(1, 10)
})

test("a reading of zero is a reading rather than an absent one", () => {
  expect(constitutionIn(held(0))).toBe(0)
  expect(constitutionIn(held("0"))).toBe(0)
})

test("a day carrying no figure is no reading rather than a constitution of zero", () => {
  expect(constitutionIn({})).toBeNull()
  expect(constitutionIn(held(null))).toBeNull()
  expect(constitutionIn(held(undefined))).toBeNull()
  expect(constitutionIn(held(""))).toBeNull()
  expect(constitutionIn(held("   "))).toBeNull()
  expect(constitutionIn(held("soon"))).toBeNull()
})

test("no tracking day is no reading rather than a constitution of zero", async () => {
  expect(await fetchConstitutionPoints(answering([]), DAY)).toBeNull()
})

test("the figure of the day asked for is the reading", async () => {
  expect(await fetchConstitutionPoints(answering([{ values: held(100) }]), DAY)).toBeCloseTo(1, 10)
})

test("a tracking day carrying no figure is no reading over the whole reach", async () => {
  expect(await fetchConstitutionPoints(answering([{ values: held(null) }]), DAY)).toBeNull()
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(
    fetchConstitutionPoints(refusing("the index holds no such page type"), DAY)
  ).rejects.toThrow("unknown rather than nothing")
})
