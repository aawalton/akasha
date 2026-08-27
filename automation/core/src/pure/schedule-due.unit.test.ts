import { describe, expect, test } from "bun:test"
import { isScheduleDue } from "./schedule-due"
import type { Trigger } from "./types"

const daily = (): Trigger => ({ kind: "schedule", rrule: "FREQ=DAILY", resetDomain: "eso-na" })

const NOON_UTC_MON = new Date("2026-06-01T12:00:00.000Z")
const PRE_RESET_UTC = new Date("2026-06-01T05:00:00.000Z")

describe("isScheduleDue", () => {
  test("daily rule with no prior fire is due for today's ESO logical day", () => {
    const r = isScheduleDue(daily(), NOON_UTC_MON, null)
    expect(r.occurrence).toBe("2026-06-01")
    expect(r.due).toBe(true)
  })

  test("daily rule already fired for today is not due (idempotent)", () => {
    const r = isScheduleDue(daily(), NOON_UTC_MON, "2026-06-01")
    expect(r.due).toBe(false)
    expect(r.occurrence).toBe("2026-06-01")
  })

  test("daily rule last fired yesterday is due (one fire per logical day)", () => {
    const r = isScheduleDue(daily(), NOON_UTC_MON, "2026-05-31")
    expect(r.due).toBe(true)
    expect(r.occurrence).toBe("2026-06-01")
  })

  test("occurrence is the ESO logical day, not the UTC date, before reset", () => {
    const r = isScheduleDue(daily(), PRE_RESET_UTC, null)
    expect(r.occurrence).toBe("2026-05-31")
    expect(r.due).toBe(true)
  })

  test("weekly BYDAY rule is due only on a matching weekday", () => {
    const monday: Trigger = {
      kind: "schedule",
      rrule: "FREQ=WEEKLY;BYDAY=MO",
      resetDomain: "eso-na",
    }
    const tuesday: Trigger = {
      kind: "schedule",
      rrule: "FREQ=WEEKLY;BYDAY=TU",
      resetDomain: "eso-na",
    }
    expect(isScheduleDue(monday, NOON_UTC_MON, null).due).toBe(true)
    expect(isScheduleDue(tuesday, NOON_UTC_MON, null).due).toBe(false)
  })

  const dailyMountain = (): Trigger => ({
    kind: "schedule",
    rrule: "FREQ=DAILY",
    resetDomain: "us-mountain",
  })

  test("us-mountain occurrence is the Denver-morning day, not the ESO day", () => {
    const inGap = new Date("2026-06-01T11:00:00.000Z")
    const r = isScheduleDue(dailyMountain(), inGap, null)
    expect(r.occurrence).toBe("2026-05-31")
    expect(r.due).toBe(true)
  })

  test("us-mountain daily rule fires once per Denver-morning day", () => {
    const afterRoll = new Date("2026-06-01T12:30:00.000Z")
    expect(isScheduleDue(dailyMountain(), afterRoll, null).occurrence).toBe("2026-06-01")
    expect(isScheduleDue(dailyMountain(), afterRoll, null).due).toBe(true)
    expect(isScheduleDue(dailyMountain(), afterRoll, "2026-06-01").due).toBe(false)
  })
})
