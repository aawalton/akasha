import { expect, test } from "bun:test"
import {
  dayAfter,
  dayBefore,
  openingInstantFromBlocks,
  windowSpanned,
} from "akasha/alan/harness/health-sample/day/modules/opening-span/opening-span.computed-property-module.code.ts"

const DAY = "2026-07-04"

const NEXT = "2026-07-05"

const slept = (startedAt: string, endedAt: string, title = "sleep") => ({
  title,
  startedAt,
  endedAt,
})

const NIGHT = slept("2026-07-04T04:00:00.000Z", "2026-07-04T13:00:00.000Z")

const EARLY = slept("2026-07-04T03:00:00.000Z", "2026-07-04T09:00:00.000Z")

const NAP = slept("2026-07-04T21:00:00.000Z", "2026-07-04T21:15:00.000Z")

const EVENING = slept("2026-07-03T23:00:00.000Z", "2026-07-04T01:30:00.000Z")

const LATE = slept("2026-07-05T01:00:00.000Z", "2026-07-05T07:00:00.000Z")

const REST = slept("2026-07-04T03:00:00.000Z", "2026-07-04T09:00:00.000Z", "rest")

test("the day after one is the day its ESO reset closes into", () => {
  expect(dayAfter(DAY)).toBe(NEXT)
  expect(dayBefore(NEXT)).toBe(DAY)
})

test("a day opens when the first sleep after six the evening before began", () => {
  expect(openingInstantFromBlocks([NIGHT], DAY)?.toISOString()).toBe("2026-07-04T04:00:00.000Z")
})

test("a sleep ending before six in the morning still opens the day", () => {
  expect(openingInstantFromBlocks([EARLY], DAY)?.toISOString()).toBe("2026-07-04T03:00:00.000Z")
})

test("a sleep starting before six in the evening and running past it opens the day", () => {
  expect(openingInstantFromBlocks([EVENING], DAY)?.toISOString()).toBe("2026-07-03T23:00:00.000Z")
})

test("a nap later in the day is not what the day opened at", () => {
  expect(openingInstantFromBlocks([EARLY, NAP], DAY)?.toISOString()).toBe(
    "2026-07-04T03:00:00.000Z"
  )
})

test("a stretch titled rest is no sleep", () => {
  expect(openingInstantFromBlocks([REST], DAY)).toBe(null)
})

test("a sleep starting after six in the evening opens the day after rather than that day", () => {
  expect(openingInstantFromBlocks([LATE], DAY)).toBe(null)
  expect(openingInstantFromBlocks([LATE], NEXT)?.toISOString()).toBe("2026-07-05T01:00:00.000Z")
})

test("a window runs from the day's opening to the next day's opening", () => {
  expect(
    windowSpanned(DAY, new Date("2026-07-04T04:00:00.000Z"), new Date("2026-07-05T04:00:00.000Z"))
  ).toEqual({ from: "2026-07-04T04:00:00.000Z", to: "2026-07-05T04:00:00.000Z" })
})

test("an end with no opening falls back to the ESO reset there", () => {
  expect(windowSpanned(DAY, null, null)).toEqual({
    from: "2026-07-04T10:00:00.000Z",
    to: "2026-07-05T10:00:00.000Z",
  })
})

test("what is no day spans no window", () => {
  expect(windowSpanned("not-a-day", null, null)).toBe(null)
})
