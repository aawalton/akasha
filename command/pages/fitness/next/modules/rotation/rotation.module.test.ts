import { expect, test } from "bun:test"
import { movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.test-fixtures.ts"
import {
  fitsIn,
  focusOn,
  RESTING,
  weekdayOn,
} from "akasha/command/pages/fitness/next/modules/rotation/rotation.module.code.ts"

const DAYS = [
  { dayOfWeek: "saturday", focus: "legs" },
  { dayOfWeek: "sunday", focus: RESTING },
]

const PRESS = movement("dumbbell-bench-press", { focus: "push" })

const PLANK = movement("plank", { focus: "core" })

test("the weekday falls out of the day Alan is on", () => {
  expect(weekdayOn("2026-09-19")).toBe("saturday")
  expect(weekdayOn("2026-09-20")).toBe("sunday")
})

test("a day that parses as no date is no weekday", () => {
  expect(weekdayOn("not-a-day")).toBe(null)
})

test("a schedule day states the focus that weekday trains", () => {
  expect(focusOn(DAYS, "saturday")).toBe("legs")
  expect(focusOn(DAYS, "sunday")).toBe(RESTING)
})

test("a weekday no schedule day names narrows nothing", () => {
  expect(focusOn(DAYS, "monday")).toBe(null)
  expect(fitsIn(PRESS, null)).toBe(true)
})

test("a movement belongs to a focus where the movement states that focus", () => {
  expect(fitsIn(PRESS, "push")).toBe(true)
  expect(fitsIn(PRESS, "pull")).toBe(false)
})

test("a movement of the core belongs to every focus that trains", () => {
  expect(fitsIn(PLANK, "push")).toBe(true)
  expect(fitsIn(PLANK, "legs")).toBe(true)
})

test("no movement belongs to a focus of rest", () => {
  expect(fitsIn(PLANK, RESTING)).toBe(false)
  expect(fitsIn(PRESS, RESTING)).toBe(false)
})
