import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { instantOps } from "./instant"

const def: PropertyDefinition = { id: "ts", title: "Timestamp", type: "instant" }

describe("instantOps.validate — ISO 8601 datetime string acceptance", () => {
  test("accepts ISO 8601 datetime strings (the shape promoted timestamptz columns produce)", () => {
    expect(instantOps.validate("2026-04-10T15:30:00.000Z", def)).toBeNull()
    expect(instantOps.validate("2026-04-10T15:30:00+00:00", def)).toBeNull()
    expect(instantOps.validate("2026-04-10T15:30:00-05:00", def)).toBeNull()
    expect(instantOps.validate("2026-04-10T15:30:00.123456Z", def)).toBeNull()
  })

  test("rejects unparseable strings with the harmonized error message", () => {
    const msg = "Instant must be a number or ISO 8601 datetime string"
    expect(instantOps.validate("2026-13-45T99:99:99Z", def)).toBe(msg)
    expect(instantOps.validate("not-a-number", def)).toBe(msg)
  })
})

describe("instantOps.getSortValue — ISO 8601 datetime string normalization", () => {
  test("normalizes ISO 8601 datetime strings to ms-epoch", () => {
    expect(instantOps.getSortValue("1970-01-01T00:00:00.000Z", def)).toBe(0)
    expect(instantOps.getSortValue("2026-04-10T00:00:00.000Z", def)).toBe(
      Date.parse("2026-04-10T00:00:00.000Z")
    )
  })

  test("numeric ordering matches chronological ordering across mixed number + ISO-string input", () => {
    const ms = 1712404800000
    const iso = new Date(ms).toISOString()
    const isoSort = instantOps.getSortValue(iso, def)
    if (typeof isoSort !== "number") throw new Error("expected number sort value")
    expect(instantOps.getSortValue(ms, def)).toBe(isoSort)
  })
})

describe("instantOps.getFilterPredicate — ISO 8601 string value-side acceptance", () => {
  const filterMs = 1712404800000
  const iso = (ms: number): string => new Date(ms).toISOString()

  test("gt accepts an ISO string row value and compares numerically", () => {
    const pred = instantOps.getFilterPredicate({ operator: "gt", value: filterMs }, def)
    expect(pred(iso(filterMs + 1))).toBe(true)
    expect(pred(iso(filterMs))).toBe(false)
    expect(pred(iso(filterMs - 1))).toBe(false)
  })

  test("lt accepts an ISO string row value and compares numerically", () => {
    const pred = instantOps.getFilterPredicate({ operator: "lt", value: filterMs }, def)
    expect(pred(iso(filterMs - 1))).toBe(true)
    expect(pred(iso(filterMs))).toBe(false)
    expect(pred(iso(filterMs + 1))).toBe(false)
  })

  test("gte accepts an ISO string row value and compares numerically", () => {
    const pred = instantOps.getFilterPredicate({ operator: "gte", value: filterMs }, def)
    expect(pred(iso(filterMs))).toBe(true)
    expect(pred(iso(filterMs - 1))).toBe(false)
  })

  test("lte accepts an ISO string row value and compares numerically", () => {
    const pred = instantOps.getFilterPredicate({ operator: "lte", value: filterMs }, def)
    expect(pred(iso(filterMs))).toBe(true)
    expect(pred(iso(filterMs + 1))).toBe(false)
  })

  test("is_between accepts an ISO string row value within the range", () => {
    const pred = instantOps.getFilterPredicate(
      {
        operator: "is_between",
        value: {
          type: "between",
          start: { sentinel: "custom_date", customInstant: 1000 },
          end: { sentinel: "custom_date", customInstant: 5000 },
        },
      },
      def
    )
    expect(pred(iso(3000))).toBe(true)
    expect(pred(iso(999))).toBe(false)
    expect(pred(iso(5001))).toBe(false)
  })

  test("is_relative_to_today accepts an ISO string row value inside the resolved range", () => {
    const pred = instantOps.getFilterPredicate(
      {
        operator: "is_relative_to_today",
        value: { type: "relative_to_today", direction: "this", unit: "year" },
      },
      def
    )
    expect(pred(new Date().toISOString())).toBe(true)
  })

  test("equals matches an ISO string row value against an equivalent ms-epoch filter", () => {
    const pred = instantOps.getFilterPredicate({ operator: "equals", value: filterMs }, def)
    expect(pred(iso(filterMs))).toBe(true)
    expect(pred(iso(filterMs + 1))).toBe(false)
  })

  test("is_not_empty matches a non-empty ISO string", () => {
    const pred = instantOps.getFilterPredicate({ operator: "is_not_empty" }, def)
    expect(pred(iso(filterMs))).toBe(true)
  })

  test("comparators reject unparseable strings (treated as null after normalization)", () => {
    const pred = instantOps.getFilterPredicate({ operator: "gt", value: filterMs }, def)
    expect(pred("not-a-number")).toBe(false)
    expect(pred("2026-13-45T99:99:99Z")).toBe(false)
  })
})
