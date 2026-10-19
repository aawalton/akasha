import { expect, test } from "bun:test"
import {
  AT_EASE,
  charismaIn,
  connectionIn,
  easeIn,
  hoursIn,
  hoursSoFarIn,
  namesAnyone,
  namesRelationship,
} from "akasha/alan/attribute/pages/charisma/charisma.attribute.code.ts"

const AN_HOUR = 3600000

const JEN = "019db533-f382-757e-93d6-8b217ef99d58"

const LIZZY = "019db533-f382-77f7-87ea-7cf70e32924a"

const ran = (safety: unknown, difficulty: unknown, hours: number, from = 0) => ({
  values: {
    "safety-level": safety,
    "difficulty-level": difficulty,
    "started-at": new Date(from * AN_HOUR).toISOString(),
    "ended-at": new Date((from + hours) * AN_HOUR).toISOString(),
    relationships: [JEN],
  },
})

const alone = (safety: unknown, difficulty: unknown, hours: number, from = 0) => ({
  values: { ...ran(safety, difficulty, hours, from).values, relationships: [] },
})

const withLizzy = (safety: unknown, difficulty: unknown, hours: number, from = 0) => ({
  values: { ...ran(safety, difficulty, hours, from).values, relationships: [LIZZY] },
})

const withBoth = (safety: unknown, difficulty: unknown, hours: number, from = 0) => ({
  values: { ...ran(safety, difficulty, hours, from).values, relationships: [LIZZY, JEN] },
})

test("a stretch names a relationship where its list holds that relationship", () => {
  expect(namesRelationship(ran(3, 1, 2).values, JEN)).toBe(true)
  expect(namesRelationship(withBoth(3, 1, 2).values, JEN)).toBe(true)
  expect(namesRelationship(withLizzy(3, 1, 2).values, JEN)).toBe(false)
  expect(namesRelationship(alone(3, 1, 2).values, JEN)).toBe(false)
  expect(namesRelationship({ "safety-level": 3 }, JEN)).toBe(false)
})

const NOW = new Date(24 * AN_HOUR)

const open = (hoursAgo: number, relationships: readonly string[] = [JEN]) => ({
  values: {
    "safety-level": 2,
    "difficulty-level": 3,
    "started-at": new Date(NOW.getTime() - hoursAgo * AN_HOUR).toISOString(),
    relationships,
  },
})

test("the connection with one person is the hours with that person", () => {
  expect(connectionIn([ran(3, 1, 2), withLizzy(3, 1, 4)], JEN, NOW)).toBe(2)
})

test("a stretch naming that person among others counts toward the connection", () => {
  expect(connectionIn([withBoth(3, 1, 1.5)], JEN, NOW)).toBe(1.5)
})

test("the connection counts hours with that person whatever their safety and difficulty", () => {
  const day = [ran(3, 1, 2), ran(2.5, 2, 4), withLizzy(3, 1, 3), alone(5, 0, 8), withBoth(4, 1, 1)]
  expect(connectionIn(day, JEN, NOW)).toBe(7)
  expect(charismaIn(day)).toBe(6)
})

test("a stretch missing a level still counts toward the connection", () => {
  expect(connectionIn([ran(null, null, 3)], JEN, NOW)).toBe(3)
})

test("an open stretch with that person counts up to now", () => {
  expect(connectionIn([ran(3, 1, 2), open(0.5)], JEN, NOW)).toBe(2.5)
})

test("an open stretch with someone else adds nothing", () => {
  expect(connectionIn([open(1, [LIZZY])], JEN, NOW)).toBe(0)
})

test("an open stretch starting after now adds nothing", () => {
  expect(connectionIn([open(-1)], JEN, NOW)).toBe(0)
})

test("the hours so far of a closed stretch are the hours it ran", () => {
  expect(hoursSoFarIn(ran(3, 1, 2).values, NOW)).toBe(2)
})

test("a stretch whose end cannot be read is no hours so far", () => {
  expect(hoursSoFarIn({ "started-at": NOW.toISOString(), "ended-at": "never" }, NOW)).toBeNull()
})

test("a day spent with nobody but others is a connection of zero", () => {
  expect(connectionIn([withLizzy(3, 1, 2), alone(3, 1, 1)], JEN, NOW)).toBe(0)
})

test("no stretch stating when it started is no connection rather than zero", () => {
  expect(connectionIn([], JEN, NOW)).toBeNull()
  expect(connectionIn([{ values: { relationships: [JEN] } }], JEN, NOW)).toBeNull()
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
  expect(hoursIn({ "started-at": "2026-09-01T00:00:00.000Z" })).toBeNull()
  expect(hoursIn({ "ended-at": "2026-09-01T00:00:00.000Z" })).toBeNull()
  expect(hoursIn({ "started-at": "never", "ended-at": "never" })).toBeNull()
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
