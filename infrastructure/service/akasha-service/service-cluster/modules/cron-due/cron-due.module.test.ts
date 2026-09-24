import { expect, test } from "bun:test"
import {
  cronIn,
  fieldIn,
  lastDue,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/cron-due/cron-due.module.code.ts"

const NOW = new Date("2026-09-24T18:32:10.000Z")

function dueAt(schedule: string): string | null {
  return lastDue(schedule, NOW)?.toISOString() ?? null
}

test("a field reads a star, a list, a range and a step as the values each names", () => {
  expect([...(fieldIn("*", 0, 3) ?? [])]).toEqual([0, 1, 2, 3])
  expect([...(fieldIn("1,3", 0, 5) ?? [])]).toEqual([1, 3])
  expect([...(fieldIn("2-4", 0, 5) ?? [])]).toEqual([2, 3, 4])
  expect([...(fieldIn("*/15", 0, 59) ?? [])]).toEqual([0, 15, 30, 45])
  expect([...(fieldIn("5/20", 0, 59) ?? [])]).toEqual([5, 25, 45])
})

test("a field naming a value out of its bounds or no number is no field", () => {
  expect(fieldIn("60", 0, 59)).toBe(null)
  expect(fieldIn("a", 0, 59)).toBe(null)
  expect(fieldIn("*/0", 0, 59)).toBe(null)
  expect(fieldIn("5-2", 0, 59)).toBe(null)
})

test("a schedule of other than five fields is no schedule", () => {
  expect(cronIn("0 4 * *")).toBe(null)
  expect(cronIn("@daily")).toBe(null)
  expect(dueAt("@daily")).toBe(null)
})

test("a seven among the weekdays is Sunday", () => {
  expect(cronIn("0 0 * * 7")?.weekdays.has(0)).toBe(true)
})

test("the last moment due is the latest minute the schedule names at or before the moment given", () => {
  expect(dueAt("*/5 * * * *")).toBe("2026-09-24T18:30:00.000Z")
  expect(dueAt("0 */6 * * *")).toBe("2026-09-24T18:00:00.000Z")
  expect(dueAt("0 4 * * *")).toBe("2026-09-24T04:00:00.000Z")
  expect(dueAt("0 4 * * 0")).toBe("2026-09-20T04:00:00.000Z")
  expect(dueAt("30 2 1 * *")).toBe("2026-09-01T02:30:00.000Z")
})

test("a minute the schedule names is due at that minute itself", () => {
  expect(lastDue("30 18 * * *", new Date("2026-09-24T18:30:00.000Z"))?.toISOString()).toBe(
    "2026-09-24T18:30:00.000Z"
  )
})

test("a schedule naming both a day of the month and a weekday is due on either", () => {
  expect(dueAt("0 9 1 * 1")).toBe("2026-09-21T09:00:00.000Z")
})

test("a schedule due nowhere in the last year says no moment", () => {
  expect(dueAt("0 0 29 2 *")).toBe(null)
})
