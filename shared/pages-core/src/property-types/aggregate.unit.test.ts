import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { aggregateOps } from "./aggregate"
import type { FilterConfig } from "./types"

const def: PropertyDefinition = { id: "agg", title: "Total", type: "aggregate" }

describe("aggregateOps.validate", () => {
  test("always returns null (aggregates are computed, not user-set)", () => {
    expect(aggregateOps.validate(null, def)).toBeNull()
    expect(aggregateOps.validate(undefined, def)).toBeNull()
    expect(aggregateOps.validate(42, def)).toBeNull()
    expect(aggregateOps.validate("hello", def)).toBeNull()
    expect(aggregateOps.validate([], def)).toBeNull()
  })
})

describe("aggregateOps.getSortValue", () => {
  test("returns number for numeric values", () => {
    expect(aggregateOps.getSortValue(42, def)).toBe(42)
    expect(aggregateOps.getSortValue(0, def)).toBe(0)
    expect(aggregateOps.getSortValue(-5, def)).toBe(-5)
  })

  test("returns number for numeric strings", () => {
    expect(aggregateOps.getSortValue("42", def)).toBe(42)
    expect(aggregateOps.getSortValue("3.14", def)).toBe(3.14)
    expect(aggregateOps.getSortValue("0", def)).toBe(0)
  })

  test("returns null for non-numeric values", () => {
    expect(aggregateOps.getSortValue(null, def)).toBeNull()
    expect(aggregateOps.getSortValue(undefined, def)).toBeNull()
    expect(aggregateOps.getSortValue("", def)).toBeNull()
    expect(aggregateOps.getSortValue("abc", def)).toBeNull()
  })

  test("returns null for NaN (toNumber returns null for NaN)", () => {
    expect(aggregateOps.getSortValue(NaN, def)).toBeNull()
  })

  test("returns Infinity for Infinity", () => {
    expect(aggregateOps.getSortValue(Infinity, def)).toBe(Infinity)
  })

  test("returns -Infinity for -Infinity", () => {
    expect(aggregateOps.getSortValue(-Infinity, def)).toBe(-Infinity)
  })

  test("returns null for boolean values (toNumber returns null)", () => {
    expect(aggregateOps.getSortValue(true, def)).toBe(1)
    expect(aggregateOps.getSortValue(false, def)).toBe(0)
  })

  test("returns negative numbers", () => {
    expect(aggregateOps.getSortValue(-5, def)).toBe(-5)
    expect(aggregateOps.getSortValue(-100.5, def)).toBe(-100.5)
  })
})

describe("aggregateOps.getFilterOperators", () => {
  test("returns exact operator list with labels", () => {
    expect(aggregateOps.getFilterOperators(def)).toEqual([
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })

  test("returns a fresh array each call (no shared mutable state)", () => {
    const a = aggregateOps.getFilterOperators(def)
    const b = aggregateOps.getFilterOperators(def)
    expect(a).not.toBe(b)
    expect(a).toEqual(b)
  })
})

describe("aggregateOps.getFilterPredicate", () => {
  describe("equals", () => {
    test("matches exact numeric value", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "equals", value: 42 }, def)
      expect(pred(42)).toBe(true)
      expect(pred(43)).toBe(false)
    })

    test("returns false for null value (toNumber(null) is null)", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "equals", value: 42 }, def)
      expect(pred(null)).toBe(false)
    })

    test("string coercion — '42' equals 42 (both go through toNumber)", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "equals", value: "42" }, def)
      expect(pred(42)).toBe(true)
      expect(pred("42")).toBe(true)
    })

    test("null equals null (both toNumber to null)", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "equals", value: null }, def)
      expect(pred(null)).toBe(true)
      expect(pred(42)).toBe(false)
    })
  })

  describe("not_equals", () => {
    test("rejects matching numeric value", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "not_equals", value: 42 }, def)
      expect(pred(42)).toBe(false)
      expect(pred(43)).toBe(true)
    })

    test("null handling", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "not_equals", value: 42 }, def)
      expect(pred(null)).toBe(true)
    })

    test("null vs null", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "not_equals", value: null }, def)
      expect(pred(null)).toBe(false)
    })
  })

  describe("gt", () => {
    test("matches values strictly greater than filter", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "gt", value: 10 }, def)
      expect(pred(11)).toBe(true)
      expect(pred(10)).toBe(false)
      expect(pred(9)).toBe(false)
    })

    test("returns false for null value", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "gt", value: 10 }, def)
      expect(pred(null)).toBe(false)
    })

    test("returns false when filterNum is null", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "gt", value: null }, def)
      expect(pred(42)).toBe(false)
    })
  })

  describe("lt", () => {
    test("matches values strictly less than filter", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "lt", value: 10 }, def)
      expect(pred(9)).toBe(true)
      expect(pred(10)).toBe(false)
      expect(pred(11)).toBe(false)
    })

    test("returns false for null value", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "lt", value: 10 }, def)
      expect(pred(null)).toBe(false)
    })

    test("returns false when filterNum is null", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "lt", value: null }, def)
      expect(pred(5)).toBe(false)
    })
  })

  describe("gte", () => {
    test("matches values greater than or equal to filter", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "gte", value: 10 }, def)
      expect(pred(11)).toBe(true)
      expect(pred(10)).toBe(true)
      expect(pred(9)).toBe(false)
    })

    test("boundary — same value returns true", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "gte", value: 42 }, def)
      expect(pred(42)).toBe(true)
    })

    test("returns false for null value", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "gte", value: 10 }, def)
      expect(pred(null)).toBe(false)
    })

    test("returns false when filterNum is null", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "gte", value: null }, def)
      expect(pred(42)).toBe(false)
    })
  })

  describe("lte", () => {
    test("matches values less than or equal to filter", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "lte", value: 10 }, def)
      expect(pred(9)).toBe(true)
      expect(pred(10)).toBe(true)
      expect(pred(11)).toBe(false)
    })

    test("boundary — same value returns true", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "lte", value: 42 }, def)
      expect(pred(42)).toBe(true)
    })

    test("returns false for null value", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "lte", value: 10 }, def)
      expect(pred(null)).toBe(false)
    })

    test("returns false when filterNum is null", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "lte", value: null }, def)
      expect(pred(42)).toBe(false)
    })
  })

  describe("is_empty", () => {
    test("matches null, undefined, empty string, and non-numeric", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred(null)).toBe(true)
      expect(pred(undefined)).toBe(true)
      expect(pred("")).toBe(true)
      expect(pred("abc")).toBe(true)
    })

    test("does not match numeric values", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred(42)).toBe(false)
      expect(pred(0)).toBe(false)
      expect(pred("42")).toBe(false)
    })
  })

  describe("is_not_empty", () => {
    test("matches numeric values", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred(42)).toBe(true)
      expect(pred(0)).toBe(true)
      expect(pred("42")).toBe(true)
    })

    test("does not match null, undefined, or non-numeric", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred(null)).toBe(false)
      expect(pred(undefined)).toBe(false)
      expect(pred("")).toBe(false)
    })
  })

  describe("unknown operator", () => {
    test("defaults to true (permissive fallback)", () => {
      const pred = aggregateOps.getFilterPredicate({ operator: "contains" }, def)
      expect(pred(42)).toBe(true)
      expect(pred(null)).toBe(true)
    })
  })
})

describe("aggregateOps.getFilterPredicate boundary cases", () => {
  const cases: Array<[string, FilterConfig, ReadonlyJSONValue, boolean]> = [
    ["equals: 0 equals 0", { operator: "equals", value: 0 }, 0, true],

    ["equals: negative equals negative", { operator: "equals", value: -5 }, -5, true],

    ["equals: '42' equals 42 (toNumber coercion)", { operator: "equals", value: "42" }, 42, true],

    ["is_empty: NaN", { operator: "is_empty" }, NaN, true],

    ["gt: Infinity > 999999", { operator: "gt", value: 999999 }, Infinity, true],

    ["lt: -Infinity < -999999", { operator: "lt", value: -999999 }, -Infinity, true],

    ["is_not_empty: 0", { operator: "is_not_empty" }, 0, true],

    ["not_equals: 1 != 2", { operator: "not_equals", value: 1 }, 2, true],

    ["gte: 10 >= 10", { operator: "gte", value: 10 }, 10, true],

    ["lte: 10 <= 10", { operator: "lte", value: 10 }, 10, true],
  ]

  for (const [label, config, value, expected] of cases) {
    test(label, () => {
      expect(aggregateOps.getFilterPredicate(config, def)(value)).toBe(expected)
    })
  }
})
