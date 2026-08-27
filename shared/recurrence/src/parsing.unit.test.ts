import { describe, expect, it } from "bun:test"

import { parseRecurringText } from "./parsing"

describe("parseRecurringText", () => {
  it("returns null for empty input", () => {
    expect(parseRecurringText("")).toBeNull()
    expect(parseRecurringText("   ")).toBeNull()
  })

  it("returns null for non-recurring input", () => {
    expect(parseRecurringText("tomorrow")).toBeNull()
    expect(parseRecurringText("monday at 9am")).toBeNull()
    expect(parseRecurringText("2026-06-15")).toBeNull()
  })

  it("parses 'every day' into a daily rrule", () => {
    const result = parseRecurringText("every day")
    expect(result).not.toBeNull()
    expect(result?.rrule).toContain("FREQ=DAILY")
    expect(result?.rruleFromCompletion).toBe(false)
  })

  it("parses 'every monday' into a weekly Monday rrule", () => {
    const result = parseRecurringText("every monday")
    expect(result?.rrule).toContain("FREQ=WEEKLY")
    expect(result?.rrule).toContain("BYDAY=MO")
  })

  it("parses 'every 2 weeks on mon, wed' with INTERVAL and multiple BYDAY", () => {
    const result = parseRecurringText("every 2 weeks on mon, wed")
    expect(result?.rrule).toContain("FREQ=WEEKLY")
    expect(result?.rrule).toContain("INTERVAL=2")
    expect(result?.rrule).toMatch(/BYDAY=(MO,WE|WE,MO)/)
  })

  it("recognizes 'every!' prefix as anchor-from-completion", () => {
    const result = parseRecurringText("every! day")
    expect(result?.rruleFromCompletion).toBe(true)
    expect(result?.rrule).toContain("FREQ=DAILY")
  })

  it("strips the RRULE: prefix from the produced rule string", () => {
    const result = parseRecurringText("every day")
    expect(result?.rrule).not.toContain("RRULE:")
    expect(result?.rrule.startsWith("FREQ=")).toBe(true)
  })

  it("extracts trailing 'at <time>' as a separate time field, leaving the rrule string time-free", () => {
    const result = parseRecurringText("every monday at 9am")
    expect(result?.rrule).toContain("FREQ=WEEKLY")
    expect(result?.rrule).toContain("BYDAY=MO")
    expect(result?.time).toBe("09:00")
  })

  it("extracts 24-hour times from the trailing 'at <time>' suffix", () => {
    const result = parseRecurringText("every day at 18:30")
    expect(result?.time).toBe("18:30")
  })

  it("extracts 12-hour times with explicit pm", () => {
    const result = parseRecurringText("every day at 9:30pm")
    expect(result?.time).toBe("21:30")
  })

  it("returns null when RRule.fromText cannot parse the post-prefix text", () => {
    expect(parseRecurringText("every quux")).toBeNull()
  })

  it("is case-insensitive for the 'every' prefix", () => {
    const result = parseRecurringText("Every Day")
    expect(result?.rrule).toContain("FREQ=DAILY")
  })

  it("preserves anchorFromCompletion=false when the 'every!' variant is not used", () => {
    const result = parseRecurringText("every week")
    expect(result?.rruleFromCompletion).toBe(false)
  })
})
