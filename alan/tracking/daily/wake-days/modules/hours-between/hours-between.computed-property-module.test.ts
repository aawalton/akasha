import { expect, test } from "bun:test"
import { hoursBetween } from "./hours-between.computed-property-module.code.ts"

const NOON = "2026-09-08T12:00:00.000Z"

const EVENING = "2026-09-08T18:30:00.000Z"

test("the hours are the same whichever instant is handed in first", () => {
  expect(hoursBetween(NOON, EVENING)).toBe(6.5)
  expect(hoursBetween(EVENING, NOON)).toBe(6.5)
})

test("an end that is no readable instant is no reading rather than zero", () => {
  expect(hoursBetween(NOON, "half past something")).toBeNull()
  expect(hoursBetween(NOON, undefined)).toBeNull()
  expect(hoursBetween(null, EVENING)).toBeNull()
})
