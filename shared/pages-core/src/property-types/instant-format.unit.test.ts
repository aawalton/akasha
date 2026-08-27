import { describe, expect, test } from "bun:test"
import { parseConfig } from "../schema/pages"
import { instantConfigSchema } from "../schema/property-config-schemas"
import { formatAbsoluteInstant } from "./instant"

describe("instantConfigSchema", () => {
  test("defaults format to 'relative' when absent", () => {
    expect(parseConfig(instantConfigSchema, undefined, { format: "relative" }).format).toBe(
      "relative"
    )
    expect(parseConfig(instantConfigSchema, {}, { format: "relative" }).format).toBe("relative")
  })

  test("parses each explicit absolute format", () => {
    for (const format of ["absolute-date-time", "absolute-date", "absolute-time"] as const) {
      expect(parseConfig(instantConfigSchema, { format }, { format: "relative" }).format).toBe(
        format
      )
    }
  })

  test("falls back when format is not a recognized literal", () => {
    expect(
      parseConfig(instantConfigSchema, { format: "bogus" }, { format: "relative" }).format
    ).toBe("relative")
  })
})

describe("formatAbsoluteInstant", () => {
  const ms = Date.UTC(2026, 5, 15, 15, 30, 0)

  test("absolute-date renders a date (year present) and no clock time", () => {
    const out = formatAbsoluteInstant(ms, "absolute-date", "UTC")
    expect(out).toContain("2026")
    expect(out).not.toContain(":")
  })

  test("absolute-time renders a clock time (colon present) and no year", () => {
    const out = formatAbsoluteInstant(ms, "absolute-time", "UTC")
    expect(out).toContain(":")
    expect(out).not.toContain("2026")
  })

  test("absolute-date-time renders both a date and a clock time", () => {
    const out = formatAbsoluteInstant(ms, "absolute-date-time", "UTC")
    expect(out).toContain("2026")
    expect(out).toContain(":")
  })

  test("respects the timeZone argument (distinct zones render differently)", () => {
    const utc = formatAbsoluteInstant(ms, "absolute-date-time", "UTC")
    const offset = formatAbsoluteInstant(ms, "absolute-date-time", "Etc/GMT+8")
    expect(utc).not.toBe(offset)
  })
})
