import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import { capacityIn, fetchCapacityHours, stretchesOf } from "./upkeep-capacity.readout.code.ts"

const DAY = "01a05fc3-145a-7000-9000-000000000000"

const held = (capacity: unknown) => ({ values: { "health-capacity-hours": capacity } })

test("the stretches asked for are the ones beside the day the caller named", () => {
  const query = stretchesOf(DAY) as Record<string, unknown>
  expect(query["page-type"]).toBe("session-tracking")
  expect(query.where).toEqual({ "daily-tracking": { is: DAY } })
})

test("the capacity is the one key asked for", () => {
  expect((stretchesOf(DAY) as Record<string, unknown>).keys).toEqual(["health-capacity-hours"])
})

test("a day is read as holding two hundred stretches at the most", () => {
  expect((stretchesOf(DAY) as Record<string, unknown>).limit).toBe(200)
})

test("a capacity given as text is read as the number it spells", () => {
  expect(capacityIn([held("1.5")])).toBe(1.5)
  expect(capacityIn([held("-3.25")])).toBe(-3.25)
  expect(capacityIn([held(-2)])).toBe(-2)
})

test("the reading is what every stretch of the day adds up to", () => {
  expect(capacityIn([held(1.5), held("2"), held(-0.5)])).toBe(3)
})

test("a stretch carrying no capacity is left out of the sum", () => {
  expect(capacityIn([held(2), held(undefined), held(""), held("   "), held(null)])).toBe(2)
  expect(capacityIn([held(2), held("soon")])).toBe(2)
})

test("a capacity of zero is a reading rather than an absent one", () => {
  expect(capacityIn([held("0")])).toBe(0)
  expect(capacityIn([held(1), held(-1)])).toBe(0)
})

test("no stretch on the day is no reading rather than a capacity of zero", () => {
  expect(capacityIn([])).toBeNull()
})

test("a day whose every stretch carries no capacity is no reading", () => {
  expect(capacityIn([held(undefined), held(null), held("")])).toBeNull()
})

test("a day with no stretches is no reading over the whole reach", async () => {
  expect(await fetchCapacityHours(answering([]), DAY)).toBeNull()
})

test("the capacity of the day asked for is the reading", async () => {
  expect(await fetchCapacityHours(answering([held("-3.5"), held("1.5")]), DAY)).toBe(-2)
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(
    fetchCapacityHours(refusing("the index holds no such page type"), DAY)
  ).rejects.toThrow("unknown rather than nothing")
})
