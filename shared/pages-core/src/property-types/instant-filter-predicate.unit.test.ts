import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { resolveRelativeToTodayInstant } from "./date-sentinels"
import { instantOps } from "./instant"
import type { FilterConfig } from "./types"

const def: PropertyDefinition = { id: "ts", title: "Timestamp", type: "instant" }

describe("instantOps.getFilterPredicate with sentinel values", () => {
  test("gt with sentinel resolves to ms epoch before comparison", () => {
    const pred = instantOps.getFilterPredicate(
      { operator: "gt", value: { sentinel: "custom_date", customInstant: 1000 } },
      def
    )
    expect(pred(1001)).toBe(true)
    expect(pred(1000)).toBe(false)
    expect(pred(999)).toBe(false)
  })

  test("lte with sentinel resolves correctly", () => {
    const pred = instantOps.getFilterPredicate(
      { operator: "lte", value: { sentinel: "custom_date", customInstant: 5000 } },
      def
    )
    expect(pred(5000)).toBe(true)
    expect(pred(4999)).toBe(true)
    expect(pred(5001)).toBe(false)
  })

  test("malformed sentinel falls back gracefully", () => {
    const pred = instantOps.getFilterPredicate(
      { operator: "gt", value: { sentinel: "custom_date" } },
      def
    )
    expect(pred(1000)).toBe(false)
  })
})

describe("instantOps.getFilterPredicate — is_relative_to_today", () => {
  test("returns false for non-number values", () => {
    const pred = instantOps.getFilterPredicate(
      {
        operator: "is_relative_to_today",
        value: { type: "relative_to_today", direction: "this", unit: "year" },
      },
      def
    )
    expect(pred(null)).toBe(false)
    expect(pred("not-a-number")).toBe(false)
  })

  test("returns false for malformed value", () => {
    const pred = instantOps.getFilterPredicate({ operator: "is_relative_to_today", value: {} }, def)
    expect(pred(1000)).toBe(false)
  })

  test("accepts a number value inside the resolved range (this year)", () => {
    const pred = instantOps.getFilterPredicate(
      {
        operator: "is_relative_to_today",
        value: { type: "relative_to_today", direction: "this", unit: "year" },
      },
      def
    )
    expect(pred(Date.now())).toBe(true)
  })

  test("rejects a number value far in the future (above end)", () => {
    const pred = instantOps.getFilterPredicate(
      {
        operator: "is_relative_to_today",
        value: { type: "relative_to_today", direction: "this", unit: "year" },
      },
      def
    )
    const farFuture = new Date(9999, 5, 15).getTime()
    expect(pred(farFuture)).toBe(false)
  })

  test("rejects a number value far in the past (below start)", () => {
    const pred = instantOps.getFilterPredicate(
      {
        operator: "is_relative_to_today",
        value: { type: "relative_to_today", direction: "this", unit: "year" },
      },
      def
    )
    expect(pred(0)).toBe(false)
  })

  test("rejects a number at the half-open end boundary (start-of-next-year exact)", () => {
    const pred = instantOps.getFilterPredicate(
      {
        operator: "is_relative_to_today",
        value: { type: "relative_to_today", direction: "this", unit: "year" },
      },
      def
    )
    const { end } = resolveRelativeToTodayInstant({
      type: "relative_to_today",
      direction: "this",
      unit: "year",
    })
    expect(pred(end)).toBe(false)
  })

  test("accepts a number one millisecond before the half-open end boundary", () => {
    const pred = instantOps.getFilterPredicate(
      {
        operator: "is_relative_to_today",
        value: { type: "relative_to_today", direction: "this", unit: "year" },
      },
      def
    )
    const { end } = resolveRelativeToTodayInstant({
      type: "relative_to_today",
      direction: "this",
      unit: "year",
    })
    expect(pred(end - 1)).toBe(true)
  })
})

describe("instantOps.getFilterPredicate — is_between", () => {
  test("matches value within range", () => {
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
    expect(pred(3000)).toBe(true)
    expect(pred(1000)).toBe(true)
    expect(pred(5000)).toBe(true)
    expect(pred(999)).toBe(false)
    expect(pred(5001)).toBe(false)
  })

  test("returns false for non-number values", () => {
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
    expect(pred(null)).toBe(false)
    expect(pred("not-a-number")).toBe(false)
  })

  test("returns false for malformed value", () => {
    const pred = instantOps.getFilterPredicate({ operator: "is_between", value: {} }, def)
    expect(pred(1000)).toBe(false)
  })
})

describe("instantOps.getFilterPredicate boundary cases", () => {
  const cases: Array<[string, FilterConfig, ReadonlyJSONValue, boolean]> = [
    ["gt: same value rejected", { operator: "gt", value: 1000 }, 1000, false],
    ["lt: same value rejected", { operator: "lt", value: 1000 }, 1000, false],
    ["gte: same value accepted", { operator: "gte", value: 1000 }, 1000, true],
    ["lte: same value accepted", { operator: "lte", value: 1000 }, 1000, true],

    ["gt: 1 > 0", { operator: "gt", value: 0 }, 1, true],
    ["lt: 0 < 1", { operator: "lt", value: 1 }, 0, true],

    ["gt: 0 > -1", { operator: "gt", value: -1 }, 0, true],
    ["lt: -1 < 0", { operator: "lt", value: 0 }, -1, true],

    ["equals: null matches null", { operator: "equals", value: null }, null, true],
    ["equals: null does not match number", { operator: "equals", value: null }, 1000, false],
  ]

  for (const [label, config, value, expected] of cases) {
    test(label, () => {
      expect(instantOps.getFilterPredicate(config, def)(value)).toBe(expected)
    })
  }
})
