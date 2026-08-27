import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { dateOps } from "./date"
import type { FilterConfig } from "./types"

const def: PropertyDefinition = { id: "d", title: "Due Date", type: "calendar-date" }

describe("dateOps.getFilterPredicate with sentinel values", () => {
  test("gt with sentinel resolves to date before comparison", () => {
    const pred = dateOps.getFilterPredicate({ operator: "gt", value: { sentinel: "today" } }, def)
    expect(pred("9999-12-31")).toBe(true)
    expect(pred("0001-01-01")).toBe(false)
  })

  test("lte with custom_date sentinel uses provided date", () => {
    const pred = dateOps.getFilterPredicate(
      { operator: "lte", value: { sentinel: "custom_date", customDate: "2026-06-15" } },
      def
    )
    expect(pred("2026-06-15")).toBe(true)
    expect(pred("2026-06-14")).toBe(true)
    expect(pred("2026-06-16")).toBe(false)
  })

  test("equals with sentinel resolves before comparison", () => {
    const pred = dateOps.getFilterPredicate(
      { operator: "equals", value: { sentinel: "custom_date", customDate: "2026-04-10" } },
      def
    )
    expect(pred("2026-04-10")).toBe(true)
    expect(pred("2026-04-11")).toBe(false)
  })

  test("malformed sentinel falls back gracefully", () => {
    const pred = dateOps.getFilterPredicate(
      { operator: "gt", value: { sentinel: "custom_date" } },
      def
    )
    expect(pred("2026-04-10")).toBe(false)
  })
})

describe("dateOps.getFilterPredicate — is_relative_to_today", () => {
  test("returns false for non-string values", () => {
    const pred = dateOps.getFilterPredicate(
      {
        operator: "is_relative_to_today",
        value: { type: "relative_to_today", direction: "this", unit: "year" },
      },
      def
    )
    expect(pred(null)).toBe(false)
    expect(pred(42)).toBe(false)
  })

  test("returns false for malformed value", () => {
    const pred = dateOps.getFilterPredicate({ operator: "is_relative_to_today", value: {} }, def)
    expect(pred("2026-04-10")).toBe(false)
  })

  describe("this-year range — half-open boundary cases", () => {
    const value = {
      type: "relative_to_today" as const,
      direction: "this" as const,
      unit: "year" as const,
    }
    const pred = dateOps.getFilterPredicate({ operator: "is_relative_to_today", value }, def)
    const y = new Date().getFullYear()
    const cases: Array<[string, boolean]> = [
      [`${y}-06-15`, true],
      [`${y}-01-01`, true],
      [`${y}-12-31`, true],
      [`${y - 1}-12-31`, false],
      [`${y + 1}-01-01`, false],
      ["0001-01-01", false],
      ["9999-12-31", false],
    ]
    for (const [input, expected] of cases) {
      test(`pred(${input}) → ${expected}`, () => {
        expect(pred(input)).toBe(expected)
      })
    }
  })
})

describe("dateOps.getFilterPredicate — is_between", () => {
  test("matches date within range", () => {
    const pred = dateOps.getFilterPredicate(
      {
        operator: "is_between",
        value: {
          type: "between",
          start: { sentinel: "custom_date", customDate: "2026-04-01" },
          end: { sentinel: "custom_date", customDate: "2026-04-30" },
        },
      },
      def
    )
    expect(pred("2026-04-10")).toBe(true)
    expect(pred("2026-04-01")).toBe(true)
    expect(pred("2026-04-30")).toBe(true)
    expect(pred("2026-03-31")).toBe(false)
    expect(pred("2026-05-01")).toBe(false)
  })

  test("returns false for non-string values", () => {
    const pred = dateOps.getFilterPredicate(
      {
        operator: "is_between",
        value: {
          type: "between",
          start: { sentinel: "custom_date", customDate: "2026-01-01" },
          end: { sentinel: "custom_date", customDate: "2026-12-31" },
        },
      },
      def
    )
    expect(pred(null)).toBe(false)
    expect(pred(42)).toBe(false)
  })

  test("returns false for malformed value", () => {
    const pred = dateOps.getFilterPredicate({ operator: "is_between", value: {} }, def)
    expect(pred("2026-04-10")).toBe(false)
  })
})

describe("dateOps.getFilterPredicate boundary cases", () => {
  const cases: Array<[string, FilterConfig, ReadonlyJSONValue, boolean]> = [
    ["gt: 2026-01-01 > 2025-12-31", { operator: "gt", value: "2025-12-31" }, "2026-01-01", true],
    ["lt: 2025-12-31 < 2026-01-01", { operator: "lt", value: "2026-01-01" }, "2025-12-31", true],

    ["gt: 2026-05-01 > 2026-04-30", { operator: "gt", value: "2026-04-30" }, "2026-05-01", true],
    ["lt: 2026-04-30 < 2026-05-01", { operator: "lt", value: "2026-05-01" }, "2026-04-30", true],

    ["gt: same date rejected", { operator: "gt", value: "2026-04-10" }, "2026-04-10", false],
    ["lt: same date rejected", { operator: "lt", value: "2026-04-10" }, "2026-04-10", false],
    ["gte: same date accepted", { operator: "gte", value: "2026-04-10" }, "2026-04-10", true],
    ["lte: same date accepted", { operator: "lte", value: "2026-04-10" }, "2026-04-10", true],

    ["gt: far future", { operator: "gt", value: "9999-12-30" }, "9999-12-31", true],
    ["lt: far past", { operator: "lt", value: "0001-01-02" }, "0001-01-01", true],

    ["equals: empty matches empty", { operator: "equals", value: "" }, "", true],
    ["equals: empty does not match date", { operator: "equals", value: "" }, "2026-04-10", false],
  ]

  for (const [label, config, value, expected] of cases) {
    test(label, () => {
      expect(dateOps.getFilterPredicate(config, def)(value)).toBe(expected)
    })
  }
})
