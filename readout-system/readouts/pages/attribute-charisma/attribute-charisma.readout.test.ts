import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import {
  AT_EASE,
  charismaIn,
  easeIn,
  fetchCharismaPoints,
  hoursIn,
  stretchesOf,
} from "./attribute-charisma.readout.code.ts"

const DAY = "01a05fc3-145a-7000-9000-000000000000"

const AN_HOUR = 3600000

const ran = (safety: unknown, difficulty: unknown, hours: number, from = 0) => ({
  values: {
    "safety-level": safety,
    "difficulty-level": difficulty,
    "start-time": new Date(from * AN_HOUR).toISOString(),
    "end-time": new Date((from + hours) * AN_HOUR).toISOString(),
  },
})

test("the stretches asked for are the ones beside the day the caller named", () => {
  const query = stretchesOf(DAY) as Record<string, unknown>
  expect(query["page-type"]).toBe("session-tracking")
  expect(query.where).toEqual({ "daily-tracking": { is: DAY } })
})

test("both levels and both times are the keys asked for", () => {
  expect((stretchesOf(DAY) as Record<string, unknown>).keys).toEqual([
    "safety-level",
    "difficulty-level",
    "start-time",
    "end-time",
  ])
})

test("a day is read as holding two hundred stretches at the most", () => {
  expect((stretchesOf(DAY) as Record<string, unknown>).limit).toBe(200)
})

test("a stretch is at ease where its safety less its difficulty is one or more", () => {
  expect(AT_EASE).toBe(1)
  expect(easeIn(ran(3, 2, 1).values)).toBe(1)
  expect(easeIn(ran(2.5, 2, 1).values)).toBe(0.5)
})

test("a level given as text is read as the number that text spells", () => {
  expect(easeIn(ran("3", "1", 1).values)).toBe(2)
})

test("a stretch missing either level is no ease at all", () => {
  expect(easeIn(ran(3, null, 1).values)).toBeNull()
  expect(easeIn(ran(null, 2, 1).values)).toBeNull()
  expect(easeIn(ran("", "  ", 1).values)).toBeNull()
})

test("the hours a stretch ran are the span between its two times", () => {
  expect(hoursIn(ran(3, 1, 2.5).values)).toBe(2.5)
})

test("a stretch missing either time is no hours at all", () => {
  expect(hoursIn({ "start-time": "2026-09-01T00:00:00.000Z" })).toBeNull()
  expect(hoursIn({ "end-time": "2026-09-01T00:00:00.000Z" })).toBeNull()
  expect(hoursIn({ "start-time": "never", "end-time": "never" })).toBeNull()
})

test("the reading is the hours of the stretches at ease", () => {
  expect(charismaIn([ran(3, 1, 2), ran(3, 2, 1.5)])).toBe(3.5)
})

test("a stretch that is not at ease adds no hours", () => {
  expect(charismaIn([ran(3, 1, 2), ran(2.5, 2, 4)])).toBe(2)
})

test("a day whose readable stretches are none of them at ease is a reading of zero", () => {
  expect(charismaIn([ran(2.5, 2, 4), ran(2, 2, 3)])).toBe(0)
})

test("a stretch missing a level is left out of the sum", () => {
  expect(charismaIn([ran(3, 1, 2), ran(3, null, 5), ran(null, 1, 5)])).toBe(2)
})

test("a stretch missing a time is left out of the sum", () => {
  const timeless = { values: { "safety-level": 3, "difficulty-level": 1 } }
  expect(charismaIn([ran(3, 1, 2), timeless])).toBe(2)
})

test("no stretch on the day is no reading rather than a charisma of zero", () => {
  expect(charismaIn([])).toBeNull()
})

test("a day no stretch can be read on is no reading rather than a charisma of zero", () => {
  expect(charismaIn([ran(null, null, 3), { values: {} }])).toBeNull()
})

test("a day with no stretches is no reading over the whole reach", async () => {
  expect(await fetchCharismaPoints(answering([]), DAY)).toBeNull()
})

test("the hours at ease of the day asked for are the reading", async () => {
  expect(await fetchCharismaPoints(answering([ran(3, 1, 2), ran(2, 2, 6)]), DAY)).toBe(2)
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(
    fetchCharismaPoints(refusing("the index holds no such page type"), DAY)
  ).rejects.toThrow("unknown rather than nothing")
})
