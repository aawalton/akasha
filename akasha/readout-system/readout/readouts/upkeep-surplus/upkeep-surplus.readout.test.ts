import { expect, test } from "bun:test"
import {
  type Asking,
  fetchSurplusHours,
  surplusIn,
  trackingOn,
} from "./upkeep-surplus.readout.code.ts"

const DAY = "2026-09-01"

const answering =
  (rows: readonly { values: Record<string, unknown> }[]): Asking =>
  async () => ({ ok: true, rows })

const refusing =
  (why: string): Asking =>
  async () => ({ ok: false, why })

test("the day asked for is the tracking day the caller named", () => {
  const query = trackingOn(DAY) as Record<string, unknown>
  expect(query["page-type"]).toBe("daily-tracking")
  expect(query.where).toEqual({ date: { is: DAY } })
  expect(query.keys).toEqual(["surplus-hours"])
  expect(query.limit).toBe(1)
})

test("a surplus given as text is read as the number it spells", () => {
  expect(surplusIn({ "surplus-hours": "1.5" })).toBe(1.5)
  expect(surplusIn({ "surplus-hours": "-3.25" })).toBe(-3.25)
  expect(surplusIn({ "surplus-hours": -2 })).toBe(-2)
})

test("a surplus of zero is a reading rather than an absent one", () => {
  expect(surplusIn({ "surplus-hours": "0" })).toBe(0)
})

test("a day carrying no surplus is no reading rather than a surplus of zero", () => {
  expect(surplusIn({})).toBeNull()
  expect(surplusIn({ "surplus-hours": "" })).toBeNull()
  expect(surplusIn({ "surplus-hours": "   " })).toBeNull()
  expect(surplusIn({ "surplus-hours": "soon" })).toBeNull()
  expect(surplusIn({ "surplus-hours": null })).toBeNull()
})

test("no tracking day is no reading rather than a surplus of zero", async () => {
  expect(await fetchSurplusHours(answering([]), DAY)).toBeNull()
})

test("the surplus of the day asked for is the reading", async () => {
  expect(await fetchSurplusHours(answering([{ values: { "surplus-hours": "-3.5" } }]), DAY)).toBe(
    -3.5
  )
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(
    fetchSurplusHours(refusing("the index holds no such page type"), DAY)
  ).rejects.toThrow("unknown rather than nothing")
})
