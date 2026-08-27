import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { numberOps, toNumber } from "./number"

const def: PropertyDefinition = { id: "n", title: "Number", type: "number" }
const defWithRange: PropertyDefinition = {
  id: "n",
  title: "Number",
  type: "number",
  config: { min: 0, max: 10 },
}

describe("toNumber", () => {
  test("handles null/undefined/empty", () => {
    expect(toNumber(null)).toBeNull()
    expect(toNumber(undefined)).toBeNull()
    expect(toNumber("")).toBeNull()
  })

  test("parses numeric values", () => {
    expect(toNumber(3)).toBe(3)
    expect(toNumber("3.5")).toBe(3.5)
  })

  test("returns null for NaN", () => {
    expect(toNumber("abc")).toBeNull()
  })
})

describe("numberOps", () => {
  test("validate passes for empty/null", () => {
    expect(numberOps.validate(null, def)).toBeNull()
    expect(numberOps.validate("", def)).toBeNull()
  })

  test("validate rejects non-numbers", () => {
    expect(numberOps.validate("abc", def)).toBe("Must be a number")
  })

  test("validate enforces min/max", () => {
    expect(numberOps.validate(-1, defWithRange)).toBe("Must be at least 0")
    expect(numberOps.validate(11, defWithRange)).toBe("Must be at most 10")
    expect(numberOps.validate(5, defWithRange)).toBeNull()
  })

  test("getSortValue", () => {
    expect(numberOps.getSortValue(5)).toBe(5)
    expect(numberOps.getSortValue(null)).toBeNull()
    expect(numberOps.getSortValue("abc")).toBeNull()
  })

  test("getFilterOperators returns 8 operators in order", () => {
    expect(numberOps.getFilterOperators(def)).toEqual([
      { value: "equals", label: "=" },
      { value: "not_equals", label: "\u2260" },
      { value: "gt", label: ">" },
      { value: "lt", label: "<" },
      { value: "gte", label: "\u2265" },
      { value: "lte", label: "\u2264" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })

  test("getFilterPredicate numeric comparisons", () => {
    expect(numberOps.getFilterPredicate({ operator: "equals", value: 5 }, def)(5)).toBe(true)
    expect(numberOps.getFilterPredicate({ operator: "equals", value: 5 }, def)(6)).toBe(false)
    expect(numberOps.getFilterPredicate({ operator: "not_equals", value: 5 }, def)(6)).toBe(true)
    expect(numberOps.getFilterPredicate({ operator: "gt", value: 5 }, def)(6)).toBe(true)
    expect(numberOps.getFilterPredicate({ operator: "gt", value: 5 }, def)(4)).toBe(false)
    expect(numberOps.getFilterPredicate({ operator: "lt", value: 5 }, def)(4)).toBe(true)
    expect(numberOps.getFilterPredicate({ operator: "gte", value: 5 }, def)(5)).toBe(true)
    expect(numberOps.getFilterPredicate({ operator: "lte", value: 5 }, def)(5)).toBe(true)
    expect(numberOps.getFilterPredicate({ operator: "is_empty", value: null }, def)(null)).toBe(
      true
    )
    expect(numberOps.getFilterPredicate({ operator: "is_not_empty", value: null }, def)(3)).toBe(
      true
    )
  })
})

describe("toNumber edge cases", () => {
  test("coerces booleans via Number()", () => {
    expect(toNumber(true)).toBe(1)
    expect(toNumber(false)).toBe(0)
  })

  test("preserves Infinity and -Infinity", () => {
    expect(toNumber(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY)
    expect(toNumber(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY)
  })

  test("handles MAX_SAFE_INTEGER and MIN_SAFE_INTEGER", () => {
    expect(toNumber(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER)
    expect(toNumber(Number.MIN_SAFE_INTEGER)).toBe(Number.MIN_SAFE_INTEGER)
  })

  test("parses scientific notation and negatives", () => {
    expect(toNumber("1e3")).toBe(1000)
    expect(toNumber("-42")).toBe(-42)
    expect(toNumber("-3.14")).toBeCloseTo(-3.14)
  })

  test("NaN input returns null", () => {
    expect(toNumber(Number.NaN)).toBeNull()
  })

  test("non-numeric objects return null", () => {
    expect(toNumber({})).toBeNull()
    expect(toNumber([1, 2])).toBeNull()
  })
})

describe("numberOps edge cases", () => {
  const defMinOnly: PropertyDefinition = { id: "n", title: "N", type: "number", config: { min: 5 } }
  const defMaxOnly: PropertyDefinition = { id: "n", title: "N", type: "number", config: { max: 5 } }
  const defInvalidConfig: PropertyDefinition = {
    id: "n",
    title: "N",
    type: "number",
    config: { min: "not a number" },
  }

  test("validate with only min", () => {
    expect(numberOps.validate(4, defMinOnly)).toBe("Must be at least 5")
    expect(numberOps.validate(5, defMinOnly)).toBeNull()
    expect(numberOps.validate(100, defMinOnly)).toBeNull()
  })

  test("validate with only max", () => {
    expect(numberOps.validate(5, defMaxOnly)).toBeNull()
    expect(numberOps.validate(6, defMaxOnly)).toBe("Must be at most 5")
    expect(numberOps.validate(-100, defMaxOnly)).toBeNull()
  })

  test("validate accepts exact boundaries (inclusive)", () => {
    expect(numberOps.validate(0, defWithRange)).toBeNull()
    expect(numberOps.validate(10, defWithRange)).toBeNull()
  })

  test("validate falls back gracefully when config is malformed", () => {
    expect(numberOps.validate(42, defInvalidConfig)).toBeNull()
    expect(numberOps.validate(-999, defInvalidConfig)).toBeNull()
  })

  test("validate accepts numeric strings", () => {
    expect(numberOps.validate("42", def)).toBeNull()
    expect(numberOps.validate("-3.14", def)).toBeNull()
  })

  test("getSortValue for various inputs", () => {
    expect(numberOps.getSortValue(undefined)).toBeNull()
    expect(numberOps.getSortValue("")).toBeNull()
    expect(numberOps.getSortValue("42")).toBe(42)
    expect(numberOps.getSortValue(0)).toBe(0)
    expect(numberOps.getSortValue(-5)).toBe(-5)
  })

  test("getFilterPredicate null filter value yields false for comparisons", () => {
    expect(numberOps.getFilterPredicate({ operator: "gt", value: null }, def)(5)).toBe(false)
    expect(numberOps.getFilterPredicate({ operator: "lt", value: null }, def)(5)).toBe(false)
    expect(numberOps.getFilterPredicate({ operator: "gte", value: null }, def)(5)).toBe(false)
    expect(numberOps.getFilterPredicate({ operator: "lte", value: null }, def)(5)).toBe(false)
  })

  test("getFilterPredicate equals/not_equals compare null to null", () => {
    expect(numberOps.getFilterPredicate({ operator: "equals", value: null }, def)(null)).toBe(true)
    expect(numberOps.getFilterPredicate({ operator: "not_equals", value: null }, def)(null)).toBe(
      false
    )
    expect(numberOps.getFilterPredicate({ operator: "equals", value: null }, def)(5)).toBe(false)
  })

  test("getFilterPredicate equals is strict-by-type (no string coercion)", () => {
    expect(numberOps.getFilterPredicate({ operator: "equals", value: 10 }, def)("10")).toBe(false)
    expect(numberOps.getFilterPredicate({ operator: "equals", value: "10" }, def)(10)).toBe(false)
    expect(numberOps.getFilterPredicate({ operator: "equals", value: "5" }, def)("5")).toBe(false)
    expect(numberOps.getFilterPredicate({ operator: "not_equals", value: 10 }, def)("10")).toBe(
      true
    )
  })

  test("getFilterPredicate gt/lt still coerce numeric strings (comparison ops)", () => {
    expect(numberOps.getFilterPredicate({ operator: "gt", value: "5" }, def)("6")).toBe(true)
    expect(numberOps.getFilterPredicate({ operator: "gte", value: "5" }, def)("5")).toBe(true)
  })

  test("getFilterPredicate treats NaN-like values as empty", () => {
    expect(numberOps.getFilterPredicate({ operator: "is_empty", value: null }, def)("abc")).toBe(
      true
    )
    expect(
      numberOps.getFilterPredicate({ operator: "is_not_empty", value: null }, def)("abc")
    ).toBe(false)
  })

  test("getFilterPredicate gt/lt are strict", () => {
    expect(numberOps.getFilterPredicate({ operator: "gt", value: 5 }, def)(5)).toBe(false)
    expect(numberOps.getFilterPredicate({ operator: "lt", value: 5 }, def)(5)).toBe(false)
  })

  test("getFilterPredicate unknown operator defaults to true", () => {
    expect(numberOps.getFilterPredicate({ operator: "contains", value: 5 }, def)(5)).toBe(true)
  })
})
