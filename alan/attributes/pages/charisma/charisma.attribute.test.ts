import { expect, test } from "bun:test"
import { AT_EASE, charismaIn, easeIn, hoursIn, namesAnyone } from "./charisma.attribute.code.ts"

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
