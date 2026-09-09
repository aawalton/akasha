import { expect, test } from "bun:test"
import { answering, refusing } from "akasha/readouts/asking/readout-asking.module.test-fixtures.ts"
import {
  AT_EASE,
  charismaIn,
  easeIn,
  fetchCharismaPoints,
  hoursIn,
  namesAnyone,
  stretchesOf,
} from "./charisma.attribute.code.ts"

const DAY = "01a05fc3-145a-7000-9000-000000000000"

const AN_HOUR = 3600000

const JEN = "019db533-f382-757e-93d6-8b217ef99d58"

const ran = (safety: unknown, difficulty: unknown, hours: number, from = 0) => ({
  values: {
    "safety-level": safety,
    "difficulty-level": difficulty,
    "start-time": new Date(from * AN_HOUR).toISOString(),
    "end-time": new Date((from + hours) * AN_HOUR).toISOString(),
    relationships: [JEN],
  },
})

const alone = (safety: unknown, difficulty: unknown, hours: number, from = 0) => ({
  values: { ...ran(safety, difficulty, hours, from).values, relationships: [] },
})

test("the stretches asked for are the ones beside the day the caller named", () => {
  const query = stretchesOf(DAY) as Record<string, unknown>
  expect(query["page-type"]).toBe("session-tracking")
  expect(query.where).toEqual({ "daily-tracking": { is: DAY } })
})

test("both levels, both times and who it was with are the keys asked for", () => {
  expect((stretchesOf(DAY) as Record<string, unknown>).keys).toEqual([
    "safety-level",
    "difficulty-level",
    "start-time",
    "end-time",
    "relationships",
  ])
})

test("a stretch is with someone where that stretch names a relationship", () => {
  expect(namesAnyone(ran(3, 1, 2).values)).toBe(true)
})

test("a stretch naming an empty list is with nobody", () => {
  expect(namesAnyone(alone(3, 1, 2).values)).toBe(false)
})

test("a stretch naming no list at all is with nobody", () => {
  expect(namesAnyone({ "safety-level": 3 })).toBe(false)
})

test("a list holding blank text names nobody", () => {
  expect(namesAnyone({ relationships: ["  ", ""] })).toBe(false)
})

test("a night alone earns nothing however safe and undemanding it was", () => {
  expect(charismaIn([alone(1, 0, 6.84)])).toBe(0)
})

test("a stretch naming nobody adds no hours however far that stretch is at ease", () => {
  expect(charismaIn([ran(3, 1, 2), alone(5, 0, 9)])).toBe(2)
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

test("the points are the hours of the stretches at ease", () => {
  expect(charismaIn([ran(3, 1, 2), ran(3, 2, 1.5)])).toBe(3.5)
})

test("a stretch that is not at ease adds no hours", () => {
  expect(charismaIn([ran(3, 1, 2), ran(2.5, 2, 4)])).toBe(2)
})

test("a day whose readable stretches earn none of them earns zero", () => {
  expect(charismaIn([ran(2.5, 2, 4), ran(2, 2, 3)])).toBe(0)
})

test("a stretch missing a level is left out of the sum", () => {
  expect(charismaIn([ran(3, 1, 2), ran(3, null, 5), ran(null, 1, 5)])).toBe(2)
})

test("a stretch missing a time is left out of the sum", () => {
  const timeless = { values: { "safety-level": 3, "difficulty-level": 1 } }
  expect(charismaIn([ran(3, 1, 2), timeless])).toBe(2)
})

test("no stretch on the day earns nothing rather than a charisma of zero", () => {
  expect(charismaIn([])).toBeNull()
})

test("a day no stretch can be read on earns nothing rather than a charisma of zero", () => {
  expect(charismaIn([ran(null, null, 3), { values: {} }])).toBeNull()
})

test("a day with no stretches earns nothing over the whole reach", async () => {
  expect(await fetchCharismaPoints(answering([]), DAY)).toBeNull()
})

test("the hours at ease of the day asked for are the points", async () => {
  expect(await fetchCharismaPoints(answering([ran(3, 1, 2), ran(2, 2, 6)]), DAY)).toBe(2)
})

test("a store that refuses is a fault rather than points of nothing", async () => {
  await expect(
    fetchCharismaPoints(refusing("the index holds no such page type"), DAY)
  ).rejects.toThrow("unknown rather than nothing")
})
