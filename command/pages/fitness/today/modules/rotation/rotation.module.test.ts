import { expect, test } from "bun:test"
import {
  focusOn,
  weekdayOn,
} from "akasha/command/pages/fitness/today/modules/rotation/rotation.module.code.ts"

const DAYS = [
  { dayOfWeek: "saturday", focus: "legs" },
  { dayOfWeek: "sunday", focus: "rest" },
]

test("the weekday falls out of the day Alan is on", () => {
  expect(weekdayOn("2026-09-19")).toBe("saturday")
  expect(weekdayOn("2026-09-20")).toBe("sunday")
})

test("a day that parses as no date is no weekday", () => {
  expect(weekdayOn("not-a-day")).toBe(null)
})

test("a schedule day states the focus that weekday trains", () => {
  expect(focusOn(DAYS, "saturday")).toBe("legs")
  expect(focusOn(DAYS, "sunday")).toBe("rest")
})

test("a weekday no schedule day names has no focus", () => {
  expect(focusOn(DAYS, "monday")).toBe(null)
})
