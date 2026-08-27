import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { instantOps } from "./instant"

const def: PropertyDefinition = { id: "ts", title: "Timestamp", type: "instant" }

describe("instantOps.validate", () => {
  test("returns null for null and undefined (absent value)", () => {
    expect(instantOps.validate(null, def)).toBeNull()
    expect(instantOps.validate(undefined, def)).toBeNull()
  })

  test("returns null for empty string", () => {
    expect(instantOps.validate("", def)).toBeNull()
  })

  test("accepts valid numbers (ms-epoch timestamps)", () => {
    expect(instantOps.validate(1712404800000, def)).toBeNull()
    expect(instantOps.validate(0, def)).toBeNull()
    expect(instantOps.validate(-1, def)).toBeNull()
    expect(instantOps.validate(Date.now(), def)).toBeNull()
  })

  test("rejects non-number/non-string types (boolean/array/object)", () => {
    const msg = "Instant must be a number or ISO 8601 datetime string"
    expect(instantOps.validate(true, def)).toBe(msg)
    expect(instantOps.validate(false, def)).toBe(msg)
    expect(instantOps.validate([], def)).toBe(msg)
    expect(instantOps.validate({}, def)).toBe(msg)
  })
})

describe("instantOps.getSortValue", () => {
  test("returns the number for valid ms-epoch values", () => {
    expect(instantOps.getSortValue(1712404800000, def)).toBe(1712404800000)
    expect(instantOps.getSortValue(0, def)).toBe(0)
  })

  test("returns null for null and undefined (null-last sort)", () => {
    expect(instantOps.getSortValue(null, def)).toBeNull()
    expect(instantOps.getSortValue(undefined, def)).toBeNull()
  })

  test("returns null for unparseable inputs", () => {
    expect(instantOps.getSortValue("not-a-number", def)).toBeNull()
    expect(instantOps.getSortValue(true, def)).toBeNull()
    expect(instantOps.getSortValue([], def)).toBeNull()
  })

  test("numeric ordering matches chronological ordering for ms-epoch input", () => {
    const a = instantOps.getSortValue(1712404800000, def)
    const b = instantOps.getSortValue(1712404800001, def)
    if (typeof a !== "number" || typeof b !== "number") {
      throw new Error("expected number sort values")
    }
    expect(a < b).toBe(true)
  })

  test("numeric ordering matches chronological ordering across mixed number + ISO-string input", () => {
    const ms = 1712404800000
    const iso = new Date(ms).toISOString()
    const a = instantOps.getSortValue(ms, def)
    const b = instantOps.getSortValue(iso, def)
    expect(a).toBe(b)
  })
})

describe("instantOps.getFilterOperators", () => {
  test("returns exact operator list with labels", () => {
    expect(instantOps.getFilterOperators(def)).toEqual([
      { value: "is_relative_to_today", label: "Is relative to today" },
      { value: "equals", label: "Is" },
      { value: "gt", label: "Is after" },
      { value: "lt", label: "Is before" },
      { value: "gte", label: "Is on or after" },
      { value: "lte", label: "Is on or before" },
      { value: "is_between", label: "Is between" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })

  test("is_relative_to_today is the first (default) operator", () => {
    const ops = instantOps.getFilterOperators(def)
    expect(ops[0]?.value).toBe("is_relative_to_today")
  })

  test("returns a fresh array each call (no shared mutable state)", () => {
    const a = instantOps.getFilterOperators(def)
    const b = instantOps.getFilterOperators(def)
    expect(a).not.toBe(b)
    expect(a).toEqual(b)
  })
})

describe("instantOps.getFilterPredicate", () => {
  const now = 1712404800000
  const later = 1712404800001
  const earlier = 1712404799999

  describe("equals", () => {
    test("matches exact number", () => {
      const pred = instantOps.getFilterPredicate({ operator: "equals", value: now }, def)
      expect(pred(now)).toBe(true)
      expect(pred(later)).toBe(false)
    })

    test("uses strict equality", () => {
      const pred = instantOps.getFilterPredicate({ operator: "equals", value: null }, def)
      expect(pred(null)).toBe(true)
      expect(pred(now)).toBe(false)
    })
  })

  describe("gt (after)", () => {
    test("matches timestamps strictly after filter value", () => {
      const pred = instantOps.getFilterPredicate({ operator: "gt", value: now }, def)
      expect(pred(later)).toBe(true)
      expect(pred(now)).toBe(false)
      expect(pred(earlier)).toBe(false)
    })

    test("returns false for non-number value (type guard)", () => {
      const pred = instantOps.getFilterPredicate({ operator: "gt", value: now }, def)
      expect(pred(null)).toBe(false)
      expect(pred(undefined)).toBe(false)
      expect(pred("not-a-number")).toBe(false)
    })

    test("returns false when filterValue is non-number", () => {
      const pred = instantOps.getFilterPredicate({ operator: "gt", value: undefined }, def)
      expect(pred(now)).toBe(false)
    })
  })

  describe("lt (before)", () => {
    test("matches timestamps strictly before filter value", () => {
      const pred = instantOps.getFilterPredicate({ operator: "lt", value: now }, def)
      expect(pred(earlier)).toBe(true)
      expect(pred(now)).toBe(false)
      expect(pred(later)).toBe(false)
    })

    test("returns false for non-number value (type guard)", () => {
      const pred = instantOps.getFilterPredicate({ operator: "lt", value: now }, def)
      expect(pred(null)).toBe(false)
      expect(pred("not-a-number")).toBe(false)
    })
  })

  describe("gte (on or after)", () => {
    test("matches timestamps on or after filter value", () => {
      const pred = instantOps.getFilterPredicate({ operator: "gte", value: now }, def)
      expect(pred(now)).toBe(true)
      expect(pred(later)).toBe(true)
      expect(pred(earlier)).toBe(false)
    })

    test("returns false for non-number value (type guard)", () => {
      const pred = instantOps.getFilterPredicate({ operator: "gte", value: now }, def)
      expect(pred(null)).toBe(false)
    })
  })

  describe("lte (on or before)", () => {
    test("matches timestamps on or before filter value", () => {
      const pred = instantOps.getFilterPredicate({ operator: "lte", value: now }, def)
      expect(pred(now)).toBe(true)
      expect(pred(earlier)).toBe(true)
      expect(pred(later)).toBe(false)
    })

    test("returns false for non-number value (type guard)", () => {
      const pred = instantOps.getFilterPredicate({ operator: "lte", value: now }, def)
      expect(pred(null)).toBe(false)
    })
  })

  describe("is_empty", () => {
    test("matches null, undefined, and empty string", () => {
      const pred = instantOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred(null)).toBe(true)
      expect(pred(undefined)).toBe(true)
      expect(pred("")).toBe(true)
    })

    test("does not match valid numbers", () => {
      const pred = instantOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred(now)).toBe(false)
      expect(pred(0)).toBe(false)
    })
  })

  describe("is_not_empty", () => {
    test("matches valid numbers", () => {
      const pred = instantOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred(now)).toBe(true)
      expect(pred(0)).toBe(true)
    })

    test("does not match null, undefined, or empty string", () => {
      const pred = instantOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred(null)).toBe(false)
      expect(pred(undefined)).toBe(false)
      expect(pred("")).toBe(false)
    })
  })

  describe("unknown operator", () => {
    test("defaults to true (permissive fallback)", () => {
      const pred = instantOps.getFilterPredicate({ operator: "contains", value: now }, def)
      expect(pred(now)).toBe(true)
      expect(pred(null)).toBe(true)
    })
  })
})
