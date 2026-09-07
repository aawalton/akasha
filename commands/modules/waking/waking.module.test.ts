import { expect, test } from "bun:test"
import { dayBefore, sleeping, wokeInto } from "./waking.module.code.ts"

test("the day before a day is the day before it on the calendar", () => {
  expect(dayBefore("2026-09-04")).toBe("2026-09-03")
  expect(dayBefore("2026-09-01")).toBe("2026-08-31")
  expect(dayBefore("2026-01-01")).toBe("2025-12-31")
})

test("a day that will not parse answers itself", () => {
  expect(dayBefore("not a day")).toBe("not a day")
})

test("a stretch titled sleep is a sleep, whatever its case and spacing", () => {
  expect(sleeping("Sleep")).toBe(true)
  expect(sleeping("  sleep ")).toBe(true)
  expect(sleeping("SLEEP")).toBe(true)
})

test("a stretch titled anything else is no sleep", () => {
  expect(sleeping("Read + Rest")).toBe(false)
  expect(sleeping("Sleep + Read")).toBe(false)
  expect(sleeping("Rest")).toBe(false)
})

test("a sleep ending after the reset woke into the day it ended in", () => {
  expect(wokeInto("2026-09-04T11:00:00.000Z")).toBe("2026-09-04")
})

test("a sleep ending before the reset woke into the day before", () => {
  expect(wokeInto("2026-09-04T09:59:00.000Z")).toBe("2026-09-03")
})
