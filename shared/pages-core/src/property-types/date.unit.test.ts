import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { dateOps } from "./date"

const def: PropertyDefinition = { id: "d", title: "Due Date", type: "calendar-date" }

describe("dateOps.validate", () => {
  test("returns null for null and undefined (absent value)", () => {
    expect(dateOps.validate(null, def)).toBeNull()
    expect(dateOps.validate(undefined, def)).toBeNull()
  })

  test("returns null for empty string", () => {
    expect(dateOps.validate("", def)).toBeNull()
  })

  test("accepts valid YYYY-MM-DD dates", () => {
    expect(dateOps.validate("2026-04-10", def)).toBeNull()
    expect(dateOps.validate("2000-01-01", def)).toBeNull()
    expect(dateOps.validate("9999-12-31", def)).toBeNull()
    expect(dateOps.validate("0001-01-01", def)).toBeNull()
  })

  test("accepts leap-year date format (regex-only, no calendar validation)", () => {
    expect(dateOps.validate("2024-02-29", def)).toBeNull()
    expect(dateOps.validate("2023-02-30", def)).toBeNull()
    expect(dateOps.validate("2026-13-01", def)).toBeNull()
  })

  test("rejects non-YYYY-MM-DD string formats", () => {
    const msg = "Date must be in YYYY-MM-DD format"
    expect(dateOps.validate("04/10/2026", def)).toBe(msg)
    expect(dateOps.validate("10-04-2026", def)).toBe(msg)
    expect(dateOps.validate("2026/04/10", def)).toBe(msg)
    expect(dateOps.validate("2026-4-10", def)).toBe(msg)
    expect(dateOps.validate("2026-04-1", def)).toBe(msg)
    expect(dateOps.validate("26-04-10", def)).toBe(msg)
  })

  test("rejects ISO datetime strings (date + time)", () => {
    expect(dateOps.validate("2026-04-10T14:30:00Z", def)).toBe("Date must be in YYYY-MM-DD format")
    expect(dateOps.validate("2026-04-10 14:30", def)).toBe("Date must be in YYYY-MM-DD format")
  })

  test("rejects non-string types", () => {
    const msg = "Date must be a string"
    expect(dateOps.validate(42, def)).toBe(msg)
    expect(dateOps.validate(true, def)).toBe(msg)
    expect(dateOps.validate(false, def)).toBe(msg)
    expect(dateOps.validate(0, def)).toBe(msg)
    expect(dateOps.validate([], def)).toBe(msg)
    expect(dateOps.validate({}, def)).toBe(msg)
  })

  test("rejects whitespace-only strings", () => {
    expect(dateOps.validate(" ", def)).toBe("Date must be in YYYY-MM-DD format")
    expect(dateOps.validate("  2026-04-10  ", def)).toBe("Date must be in YYYY-MM-DD format")
  })
})

describe("dateOps.getSortValue", () => {
  test("returns the date string for valid YYYY-MM-DD", () => {
    expect(dateOps.getSortValue("2026-04-10", def)).toBe("2026-04-10")
    expect(dateOps.getSortValue("2000-01-01", def)).toBe("2000-01-01")
  })

  test("returns null for null and undefined (null-last sort)", () => {
    expect(dateOps.getSortValue(null, def)).toBeNull()
    expect(dateOps.getSortValue(undefined, def)).toBeNull()
  })

  test("returns null for empty string", () => {
    expect(dateOps.getSortValue("", def)).toBeNull()
  })

  test("returns null for invalid format strings", () => {
    expect(dateOps.getSortValue("not-a-date", def)).toBeNull()
    expect(dateOps.getSortValue("04/10/2026", def)).toBeNull()
    expect(dateOps.getSortValue("2026-04-10T00:00:00Z", def)).toBeNull()
  })

  test("returns null for non-string types", () => {
    expect(dateOps.getSortValue(42, def)).toBeNull()
    expect(dateOps.getSortValue(true, def)).toBeNull()
    expect(dateOps.getSortValue(false, def)).toBeNull()
    expect(dateOps.getSortValue([], def)).toBeNull()
  })

  test("lexicographic ordering matches chronological ordering", () => {
    const a = dateOps.getSortValue("2025-12-31", def)
    const b = dateOps.getSortValue("2026-01-01", def)
    if (typeof a !== "string" || typeof b !== "string") {
      throw new Error("expected string sort values")
    }
    expect(a < b).toBe(true)

    const c = dateOps.getSortValue("2026-04-09", def)
    const d = dateOps.getSortValue("2026-04-10", def)
    if (typeof c !== "string" || typeof d !== "string") {
      throw new Error("expected string sort values")
    }
    expect(c < d).toBe(true)
  })
})

describe("dateOps.getFilterOperators", () => {
  test("returns exact operator list with labels", () => {
    expect(dateOps.getFilterOperators(def)).toEqual([
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
    const ops = dateOps.getFilterOperators(def)
    expect(ops[0]?.value).toBe("is_relative_to_today")
  })

  test("returns a fresh array each call (no shared mutable state)", () => {
    const a = dateOps.getFilterOperators(def)
    const b = dateOps.getFilterOperators(def)
    expect(a).not.toBe(b)
    expect(a).toEqual(b)
  })
})

describe("dateOps.getFilterPredicate", () => {
  describe("equals", () => {
    test("matches exact date string", () => {
      const pred = dateOps.getFilterPredicate({ operator: "equals", value: "2026-04-10" }, def)
      expect(pred("2026-04-10")).toBe(true)
      expect(pred("2026-04-11")).toBe(false)
    })

    test("uses strict equality (not string comparison)", () => {
      const pred = dateOps.getFilterPredicate({ operator: "equals", value: null }, def)
      expect(pred(null)).toBe(true)
      expect(pred("2026-04-10")).toBe(false)
    })

    test("does not match different types even if coercible", () => {
      const pred = dateOps.getFilterPredicate({ operator: "equals", value: "42" }, def)
      expect(pred(42)).toBe(false)
    })
  })

  describe("gt (after)", () => {
    test("matches dates strictly after filter value", () => {
      const pred = dateOps.getFilterPredicate({ operator: "gt", value: "2026-04-10" }, def)
      expect(pred("2026-04-11")).toBe(true)
      expect(pred("2026-04-10")).toBe(false)
      expect(pred("2026-04-09")).toBe(false)
    })

    test("works across month and year boundaries", () => {
      const pred = dateOps.getFilterPredicate({ operator: "gt", value: "2025-12-31" }, def)
      expect(pred("2026-01-01")).toBe(true)
      expect(pred("2025-12-31")).toBe(false)
      expect(pred("2025-12-30")).toBe(false)
    })

    test("returns false for non-string value (type guard)", () => {
      const pred = dateOps.getFilterPredicate({ operator: "gt", value: "2026-04-10" }, def)
      expect(pred(null)).toBe(false)
      expect(pred(undefined)).toBe(false)
      expect(pred(42)).toBe(false)
      expect(pred(true)).toBe(false)
    })

    test("returns false when filterValue is non-string", () => {
      const pred = dateOps.getFilterPredicate({ operator: "gt", value: undefined }, def)
      expect(pred("2026-04-10")).toBe(false)
    })
  })

  describe("lt (before)", () => {
    test("matches dates strictly before filter value", () => {
      const pred = dateOps.getFilterPredicate({ operator: "lt", value: "2026-04-10" }, def)
      expect(pred("2026-04-09")).toBe(true)
      expect(pred("2026-04-10")).toBe(false)
      expect(pred("2026-04-11")).toBe(false)
    })

    test("works across month and year boundaries", () => {
      const pred = dateOps.getFilterPredicate({ operator: "lt", value: "2026-01-01" }, def)
      expect(pred("2025-12-31")).toBe(true)
      expect(pred("2026-01-01")).toBe(false)
    })

    test("returns false for non-string value (type guard)", () => {
      const pred = dateOps.getFilterPredicate({ operator: "lt", value: "2026-04-10" }, def)
      expect(pred(null)).toBe(false)
      expect(pred(42)).toBe(false)
    })

    test("returns false when filterValue is non-string", () => {
      const pred = dateOps.getFilterPredicate({ operator: "lt", value: undefined }, def)
      expect(pred("2026-04-10")).toBe(false)
    })
  })

  describe("gte (on or after)", () => {
    test("matches dates on or after filter value", () => {
      const pred = dateOps.getFilterPredicate({ operator: "gte", value: "2026-04-10" }, def)
      expect(pred("2026-04-10")).toBe(true)
      expect(pred("2026-04-11")).toBe(true)
      expect(pred("2026-04-09")).toBe(false)
    })

    test("returns false for non-string value (type guard)", () => {
      const pred = dateOps.getFilterPredicate({ operator: "gte", value: "2026-04-10" }, def)
      expect(pred(null)).toBe(false)
      expect(pred(undefined)).toBe(false)
    })

    test("returns false when filterValue is non-string", () => {
      const pred = dateOps.getFilterPredicate({ operator: "gte", value: null }, def)
      expect(pred("2026-04-10")).toBe(false)
    })
  })

  describe("lte (on or before)", () => {
    test("matches dates on or before filter value", () => {
      const pred = dateOps.getFilterPredicate({ operator: "lte", value: "2026-04-10" }, def)
      expect(pred("2026-04-10")).toBe(true)
      expect(pred("2026-04-09")).toBe(true)
      expect(pred("2026-04-11")).toBe(false)
    })

    test("returns false for non-string value (type guard)", () => {
      const pred = dateOps.getFilterPredicate({ operator: "lte", value: "2026-04-10" }, def)
      expect(pred(null)).toBe(false)
    })

    test("returns false when filterValue is non-string", () => {
      const pred = dateOps.getFilterPredicate({ operator: "lte", value: undefined }, def)
      expect(pred("2026-04-10")).toBe(false)
    })
  })

  describe("is_empty", () => {
    test("matches null, undefined, and empty string", () => {
      const pred = dateOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred(null)).toBe(true)
      expect(pred(undefined)).toBe(true)
      expect(pred("")).toBe(true)
    })

    test("does not match valid dates", () => {
      const pred = dateOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred("2026-04-10")).toBe(false)
    })

    test("does not match whitespace-only strings (not treated as empty)", () => {
      const pred = dateOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred(" ")).toBe(false)
    })

    test("does not match non-string truthy values", () => {
      const pred = dateOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred(0)).toBe(false)
      expect(pred(false)).toBe(false)
    })
  })

  describe("is_not_empty", () => {
    test("matches valid dates and non-empty strings", () => {
      const pred = dateOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred("2026-04-10")).toBe(true)
      expect(pred("not-a-date")).toBe(true)
      expect(pred(" ")).toBe(true)
    })

    test("does not match null, undefined, or empty string", () => {
      const pred = dateOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred(null)).toBe(false)
      expect(pred(undefined)).toBe(false)
      expect(pred("")).toBe(false)
    })

    test("matches non-string truthy values", () => {
      const pred = dateOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred(42)).toBe(true)
      expect(pred(0)).toBe(true)
      expect(pred(false)).toBe(true)
    })
  })

  describe("unknown operator", () => {
    test("defaults to true (permissive fallback)", () => {
      const pred = dateOps.getFilterPredicate({ operator: "contains", value: "2026" }, def)
      expect(pred("2026-04-10")).toBe(true)
      expect(pred(null)).toBe(true)
      expect(pred("")).toBe(true)
    })
  })
})
