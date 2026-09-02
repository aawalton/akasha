import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import { fetchSleepHours, sleepIn, trackingOn } from "./upkeep-sleep.readout.code.ts"

const DAY = "2026-09-01"

const held = (sleep: unknown) => ({ "sleep-hours": sleep })

test("the day asked for is the tracking day the caller named", () => {
  const query = trackingOn(DAY) as Record<string, unknown>
  expect(query["page-type"]).toBe("daily-tracking")
  expect(query.where).toEqual({ date: { is: DAY } })
  expect(query.limit).toBe(1)
})

test("the sleep alone is asked for", () => {
  expect((trackingOn(DAY) as Record<string, unknown>).keys).toEqual(["sleep-hours"])
})

test("a sleep given as text is read as the number it spells", () => {
  expect(sleepIn(held("7.5"))).toBe(7.5)
  expect(sleepIn(held("6.383333333333334"))).toBe(6.383333333333334)
  expect(sleepIn(held(8))).toBe(8)
})

test("a sleep of zero is a reading rather than an absent one", () => {
  expect(sleepIn(held("0"))).toBe(0)
  expect(sleepIn(held(0))).toBe(0)
})

test("a day holding no sleep stretch is no reading rather than a sleep of zero", () => {
  expect(sleepIn(held(undefined))).toBeNull()
  expect(sleepIn({})).toBeNull()
  expect(sleepIn(held(""))).toBeNull()
  expect(sleepIn(held("   "))).toBeNull()
  expect(sleepIn(held("soon"))).toBeNull()
  expect(sleepIn(held(null))).toBeNull()
})

test("no tracking day is no reading rather than a sleep of zero", async () => {
  expect(await fetchSleepHours(answering([]), DAY)).toBeNull()
})

test("the sleep of the day asked for is the reading", async () => {
  expect(await fetchSleepHours(answering([{ values: held("7.25") }]), DAY)).toBe(7.25)
})

test("a tracking day carrying no sleep is no reading over the whole reach", async () => {
  expect(await fetchSleepHours(answering([{ values: {} }]), DAY)).toBeNull()
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(fetchSleepHours(refusing("the index holds no such page type"), DAY)).rejects.toThrow(
    "unknown rather than nothing"
  )
})
