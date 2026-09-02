import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import {
  fetchSurplusHours,
  heldNothing,
  surplusIn,
  trackingOn,
} from "./upkeep-surplus.readout.code.ts"

const DAY = "2026-09-01"

const held = (surplus: unknown, sleep: unknown = "8", spend: unknown = "8") => ({
  "surplus-hours": surplus,
  "sleep-hours": sleep,
  "spend-hours": spend,
})

test("the day asked for is the tracking day the caller named", () => {
  const query = trackingOn(DAY) as Record<string, unknown>
  expect(query["page-type"]).toBe("daily-tracking")
  expect(query.where).toEqual({ date: { is: DAY } })
  expect(query.limit).toBe(1)
})

test("the two halves of the subtraction are asked for beside the surplus", () => {
  expect((trackingOn(DAY) as Record<string, unknown>).keys).toEqual([
    "surplus-hours",
    "sleep-hours",
    "spend-hours",
  ])
})

test("a surplus given as text is read as the number it spells", () => {
  expect(surplusIn(held("1.5"))).toBe(1.5)
  expect(surplusIn(held("-3.25"))).toBe(-3.25)
  expect(surplusIn(held(-2))).toBe(-2)
})

test("a surplus of zero is a reading rather than an absent one", () => {
  expect(surplusIn(held("0"))).toBe(0)
  expect(surplusIn(held(0, "0", "0"))).toBe(0)
})

test("a day carrying no surplus is no reading rather than a surplus of zero", () => {
  expect(surplusIn(held(undefined))).toBeNull()
  expect(surplusIn(held(""))).toBeNull()
  expect(surplusIn(held("   "))).toBeNull()
  expect(surplusIn(held("soon"))).toBeNull()
  expect(surplusIn(held(null))).toBeNull()
})

test("a day holding neither sleep nor spend has held nothing to subtract", () => {
  expect(heldNothing({ "surplus-hours": "0" })).toBe(true)
  expect(heldNothing({ "surplus-hours": "0", "sleep-hours": null, "spend-hours": null })).toBe(true)
  expect(heldNothing({ "sleep-hours": "8" })).toBe(false)
  expect(heldNothing({ "spend-hours": "0" })).toBe(false)
})

test("the zero two absent halves subtract to is no reading rather than a surplus of zero", () => {
  expect(surplusIn({ "surplus-hours": "0", "sleep-hours": null, "spend-hours": null })).toBeNull()
  expect(surplusIn({ "surplus-hours": 0 })).toBeNull()
})

test("a day that spent everything it slept is a reading of zero rather than nothing", () => {
  expect(surplusIn({ "surplus-hours": "0", "sleep-hours": "8", "spend-hours": "8" })).toBe(0)
})

test("no tracking day is no reading rather than a surplus of zero", async () => {
  expect(await fetchSurplusHours(answering([]), DAY)).toBeNull()
})

test("the surplus of the day asked for is the reading", async () => {
  expect(await fetchSurplusHours(answering([{ values: held("-3.5") }]), DAY)).toBe(-3.5)
})

test("a tracking day holding no stretch is no reading over the whole reach", async () => {
  const sessionless = [{ values: { "surplus-hours": "0", "sleep-hours": null } }]
  expect(await fetchSurplusHours(answering(sessionless), DAY)).toBeNull()
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(
    fetchSurplusHours(refusing("the index holds no such page type"), DAY)
  ).rejects.toThrow("unknown rather than nothing")
})
