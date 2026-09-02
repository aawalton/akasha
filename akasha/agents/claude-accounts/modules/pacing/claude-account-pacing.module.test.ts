import { expect, test } from "bun:test"
import {
  computePacingDerivations,
  formatPaceHours,
  hoursUntilReset,
} from "./claude-account-pacing.module.code.ts"

const RESET = "2026-09-04T12:00:00.000Z"

const OPENED = "2026-08-28T12:00:00.000Z"

const MONDAY_NOON = Date.parse("2026-08-31T12:00:00.000Z")

function paceAt(now: string, sevenDayUtil = 0, sevenDayResetsAt: string | null = RESET): number {
  return computePacingDerivations({
    now: Date.parse(now),
    sevenDayUtil,
    sevenDayResetsAt,
    fiveHourResetsAt: null,
  }).paceHoursDiff
}

test("a window opened on a Friday counts 94 hours to Tuesday morning and spends 70 of the quota", () => {
  expect(paceAt("2026-08-31T12:00:00.000Z")).toBe(70)
})

test("a window run to its own reset has elapsed 144 hours rather than 168", () => {
  expect(paceAt("2026-09-04T12:00:00.000Z")).toBe(144)
})

test("only the part of a Sunday the window has run through is dropped", () => {
  expect(paceAt("2026-08-29T12:00:00.000Z")).toBe(36)
  expect(paceAt("2026-08-30T12:00:00.000Z")).toBe(46)
  expect(paceAt("2026-08-31T12:00:00.000Z")).toBe(70)
})

test("a week boundary the window opens on splits one Sunday across both ends of that window", () => {
  expect(paceAt("2026-09-02T12:00:00.000Z", 0, "2026-09-06T12:00:00.000Z")).toBe(82)
  expect(paceAt("2026-09-06T12:00:00.000Z", 0, "2026-09-06T12:00:00.000Z")).toBe(144)
})

test("every moment of one eso-day is answered with the same pace", () => {
  expect(paceAt("2026-08-31T12:00:00.000Z")).toBe(70)
  expect(paceAt("2026-08-31T23:00:00.000Z")).toBe(70)
  expect(paceAt("2026-09-01T09:59:59.999Z")).toBe(70)
})

test("one millisecond past six in the morning in New York moves the pace a whole day", () => {
  expect(paceAt("2026-09-01T09:59:59.999Z")).toBe(70)
  expect(paceAt("2026-09-01T10:00:00.000Z")).toBe(94)
})

test("a window spanning the March turn is cut at six in the morning under summer time", () => {
  expect(paceAt("2026-03-10T12:00:00.000Z", 0, "2026-03-14T12:00:00.000Z")).toBe(70)
})

test("a window spanning the November turn is cut at six in the morning under standard time", () => {
  expect(paceAt("2026-11-03T12:00:00.000Z", 0, "2026-11-07T12:00:00.000Z")).toBe(71)
})

test("an account whose seven-day reset is unknown has 144 hours until that reset", () => {
  expect(hoursUntilReset({ now: MONDAY_NOON, sevenDayResetsAt: null })).toBe(144)
})

test("a seven-day reset already past answers 144 hours until that reset", () => {
  expect(hoursUntilReset({ now: MONDAY_NOON, sevenDayResetsAt: "2026-08-30T12:00:00.000Z" })).toBe(
    144
  )
})

test("a freshly opened window has more hours left than the 144 an unknown reset answers", () => {
  const fresh = hoursUntilReset({ now: MONDAY_NOON, sevenDayResetsAt: "2026-09-07T12:00:00.000Z" })

  expect(fresh).toBe(168)
  expect(fresh).toBeGreaterThan(hoursUntilReset({ now: MONDAY_NOON, sevenDayResetsAt: null }))
})

test("an account whose seven-day reset is unknown has elapsed the whole of its window", () => {
  expect(paceAt("2026-08-31T12:00:00.000Z", 0, null)).toBe(144)
})

test("each window is back-dated by its own length from the reset the upstream stated", () => {
  const derived = computePacingDerivations({
    now: MONDAY_NOON,
    sevenDayUtil: 10,
    sevenDayResetsAt: RESET,
    fiveHourResetsAt: "2026-09-01T15:00:00.000Z",
  })

  expect(derived.fiveHourStartedAt).toBe("2026-09-01T10:00:00.000Z")
  expect(derived.sevenDayStartedAt).toBe(OPENED)
})

test("a reset nothing states is back-dated to nothing rather than to the epoch", () => {
  const derived = computePacingDerivations({
    now: MONDAY_NOON,
    sevenDayUtil: 10,
    sevenDayResetsAt: null,
    fiveHourResetsAt: null,
  })

  expect(derived.fiveHourStartedAt).toBeNull()
  expect(derived.sevenDayStartedAt).toBeNull()
})

test("a reset that will not parse is back-dated to nothing rather than to an invalid instant", () => {
  const derived = computePacingDerivations({
    now: MONDAY_NOON,
    sevenDayUtil: 10,
    sevenDayResetsAt: "the day after",
    fiveHourResetsAt: "the day after",
  })

  expect(derived.fiveHourStartedAt).toBeNull()
  expect(derived.sevenDayStartedAt).toBeNull()
})

test("spending more than the window has run through is a pace below zero", () => {
  const behind = paceAt("2026-08-31T12:00:00.000Z", 80)

  expect(behind).toBeLessThan(0)
  expect(behind).toBeCloseTo(-45.2, 10)
  expect(formatPaceHours(behind)).toBe("-45.20")
})

test("spending less than the window has run through is a pace above zero", () => {
  const ahead = paceAt("2026-08-31T12:00:00.000Z", 10)

  expect(ahead).toBeCloseTo(55.6, 10)
  expect(formatPaceHours(ahead)).toBe("+55.60")
})

test("a burn rate is the fraction left over the hours left with Sunday taken out", () => {
  const derived = computePacingDerivations({
    now: MONDAY_NOON,
    sevenDayUtil: 80,
    sevenDayResetsAt: RESET,
    fiveHourResetsAt: null,
  })

  expect(derived.burnRateNeeded).toBeCloseTo(0.2 / 96, 15)
})

test("a reset already past leaves a thousandth of an hour rather than none", () => {
  const derived = computePacingDerivations({
    now: Date.parse("2026-09-05T12:00:00.000Z"),
    sevenDayUtil: 50,
    sevenDayResetsAt: RESET,
    fiveHourResetsAt: null,
  })

  expect(derived.burnRateNeeded).toBe(500)
})

test("a pace is written with a sign and two decimal places", () => {
  expect(formatPaceHours(0)).toBe("+0.00")
  expect(formatPaceHours(144)).toBe("+144.00")
  expect(formatPaceHours(-1.5)).toBe("-1.50")
})

test("a pace halfway between two hundredths is written up above zero and down below zero", () => {
  expect(formatPaceHours(0.025)).toBe("+0.03")
  expect(formatPaceHours(-0.025)).toBe("-0.02")
})
