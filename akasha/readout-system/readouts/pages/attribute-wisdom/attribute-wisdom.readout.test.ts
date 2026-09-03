import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import {
  fetchWisdomPoints,
  trackingOn,
  WORDS_TO_THE_POINT,
  wisdomIn,
} from "./attribute-wisdom.readout.code.ts"

const DAY = "2026-09-01"

const held = (figure: unknown) => ({ "wisdom-words": figure })

test("the day asked for is the tracking day the caller named", () => {
  const query = trackingOn(DAY) as Record<string, unknown>
  expect(query["page-type"]).toBe("daily-tracking")
  expect(query.where).toEqual({ date: { is: DAY } })
  expect(query.limit).toBe(1)
})

test("the one figure the reading is taken from is the key asked for", () => {
  expect((trackingOn(DAY) as Record<string, unknown>).keys).toEqual(["wisdom-words"])
})

test("the reading is the figure over the amount one point costs", () => {
  expect(WORDS_TO_THE_POINT).toBe(10000)
  expect(wisdomIn(held(10000))).toBeCloseTo(1, 10)
  expect(wisdomIn(held(10000 * 2))).toBeCloseTo(2, 10)
})

test("a figure given as text is read as the number that text spells", () => {
  expect(wisdomIn(held(String(10000)))).toBeCloseTo(1, 10)
})

test("a reading of zero is a reading rather than an absent one", () => {
  expect(wisdomIn(held(0))).toBe(0)
  expect(wisdomIn(held("0"))).toBe(0)
})

test("a day carrying no figure is no reading rather than a wisdom of zero", () => {
  expect(wisdomIn({})).toBeNull()
  expect(wisdomIn(held(null))).toBeNull()
  expect(wisdomIn(held(undefined))).toBeNull()
  expect(wisdomIn(held(""))).toBeNull()
  expect(wisdomIn(held("   "))).toBeNull()
  expect(wisdomIn(held("soon"))).toBeNull()
})

test("no tracking day is no reading rather than a wisdom of zero", async () => {
  expect(await fetchWisdomPoints(answering([]), DAY)).toBeNull()
})

test("the figure of the day asked for is the reading", async () => {
  expect(await fetchWisdomPoints(answering([{ values: held(10000) }]), DAY)).toBeCloseTo(1, 10)
})

test("a tracking day carrying no figure is no reading over the whole reach", async () => {
  expect(await fetchWisdomPoints(answering([{ values: held(null) }]), DAY)).toBeNull()
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(
    fetchWisdomPoints(refusing("the index holds no such page type"), DAY)
  ).rejects.toThrow("unknown rather than nothing")
})
