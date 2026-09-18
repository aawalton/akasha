import { expect, test } from "bun:test"
import {
  openUntil,
  stretchHours,
} from "akasha/alan/track/daily/day/modules/stretch-hours/stretch-hours.computed-property-module.code.ts"

const TODAY = "2026-09-08"

const YESTERDAY = "2026-09-07"

const NOON = "2026-09-08T18:00:00.000Z"

const NOW = new Date("2026-09-08T20:30:00.000Z")

test("a stretch with an end runs from its start to that end", () => {
  expect(stretchHours(NOON, "2026-09-08T19:30:00.000Z", openUntil(TODAY, NOW))).toBe(1.5)
})

test("a stretch with no end runs from its start to now", () => {
  expect(stretchHours(NOON, undefined, openUntil(TODAY, NOW))).toBe(2.5)
  expect(stretchHours(NOON, "", openUntil(TODAY, NOW))).toBe(2.5)
})

test("a stretch with no end on an earlier day runs to the midnight ending that day", () => {
  expect(stretchHours("2026-09-07T18:00:00.000Z", null, openUntil(YESTERDAY, NOW))).toBe(12)
})

test("a day whose date is unreadable counts a stretch with no end to now", () => {
  expect(stretchHours(NOON, undefined, openUntil("sometime", NOW))).toBe(2.5)
  expect(stretchHours(NOON, undefined, openUntil(undefined, NOW))).toBe(2.5)
})

test("a stretch beginning after the instant it is counted to ran no hours", () => {
  expect(stretchHours("2026-09-08T22:00:00.000Z", undefined, openUntil(TODAY, NOW))).toBe(0)
})

test("a stretch whose start cannot be read is no reading rather than no hours", () => {
  expect(stretchHours("soon", undefined, openUntil(TODAY, NOW))).toBeNull()
  expect(stretchHours(undefined, undefined, openUntil(TODAY, NOW))).toBeNull()
})
