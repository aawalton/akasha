import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { relationOps } from "./relation"
import type { FilterConfig } from "./types"

const def: PropertyDefinition = { id: "r", title: "Ref", type: "relation" }

describe("relationOps.validate", () => {
  test("returns null for null and undefined (absent value)", () => {
    expect(relationOps.validate(null, def)).toBeNull()
    expect(relationOps.validate(undefined, def)).toBeNull()
  })

  test("returns null for empty string", () => {
    expect(relationOps.validate("", def)).toBeNull()
  })

  test("accepts valid string IDs", () => {
    expect(relationOps.validate("page-123", def)).toBeNull()
    expect(relationOps.validate("abc", def)).toBeNull()
  })

  test("accepts whitespace-only strings", () => {
    expect(relationOps.validate(" ", def)).toBeNull()
    expect(relationOps.validate("  ", def)).toBeNull()
  })

  test("rejects non-string types", () => {
    const msg = "Relation value must be a string"
    expect(relationOps.validate(42, def)).toBe(msg)
    expect(relationOps.validate(true, def)).toBe(msg)
    expect(relationOps.validate([], def)).toBe(msg)
    expect(relationOps.validate({}, def)).toBe(msg)
  })

  test("rejects expanded non-string types", () => {
    const msg = "Relation value must be a string"
    expect(relationOps.validate(0, def)).toBe(msg)
    expect(relationOps.validate(false, def)).toBe(msg)
    expect(relationOps.validate(NaN, def)).toBe(msg)
  })
})

describe("relationOps.getSortValue", () => {
  test("returns the string for valid string values", () => {
    expect(relationOps.getSortValue("page-123", def)).toBe("page-123")
  })

  test("returns empty string for empty string", () => {
    expect(relationOps.getSortValue("", def)).toBe("")
  })

  test("returns null for null and undefined", () => {
    expect(relationOps.getSortValue(null, def)).toBeNull()
    expect(relationOps.getSortValue(undefined, def)).toBeNull()
  })

  test("returns null for non-string types", () => {
    expect(relationOps.getSortValue(42, def)).toBeNull()
    expect(relationOps.getSortValue(true, def)).toBeNull()
    expect(relationOps.getSortValue([], def)).toBeNull()
    expect(relationOps.getSortValue(false, def)).toBeNull()
    expect(relationOps.getSortValue({}, def)).toBeNull()
    expect(relationOps.getSortValue(0, def)).toBeNull()
  })

  test("returns null for object and array values", () => {
    expect(relationOps.getSortValue({ id: "page-1" }, def)).toBeNull()
    expect(relationOps.getSortValue(["page-1"], def)).toBeNull()
  })
})

describe("relationOps.getFilterOperators", () => {
  test("returns exact operator list with labels", () => {
    expect(relationOps.getFilterOperators(def)).toEqual([
      { value: "equals", label: "Is" },
      { value: "not_equals", label: "Is not" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })

  test("returns a fresh array each call (no shared mutable state)", () => {
    const a = relationOps.getFilterOperators(def)
    const b = relationOps.getFilterOperators(def)
    expect(a).not.toBe(b)
    expect(a).toEqual(b)
  })
})

describe("relationOps.getFilterPredicate", () => {
  describe("equals", () => {
    test("matches exact value", () => {
      const pred = relationOps.getFilterPredicate({ operator: "equals", value: "page-1" }, def)
      expect(pred("page-1")).toBe(true)
      expect(pred("page-2")).toBe(false)
    })

    test("null === null", () => {
      const pred = relationOps.getFilterPredicate({ operator: "equals", value: null }, def)
      expect(pred(null)).toBe(true)
      expect(pred("page-1")).toBe(false)
    })

    test("does not match different types even if coercible", () => {
      const pred = relationOps.getFilterPredicate({ operator: "equals", value: "42" }, def)
      expect(pred(42)).toBe(false)
    })

    test("undefined vs null strict equality", () => {
      const pred = relationOps.getFilterPredicate({ operator: "equals", value: null }, def)
      expect(pred(undefined)).toBe(false)
    })
  })

  describe("not_equals", () => {
    test("rejects matching value", () => {
      const pred = relationOps.getFilterPredicate({ operator: "not_equals", value: "page-1" }, def)
      expect(pred("page-1")).toBe(false)
      expect(pred("page-2")).toBe(true)
    })

    test("null vs undefined", () => {
      const pred = relationOps.getFilterPredicate({ operator: "not_equals", value: null }, def)
      expect(pred(undefined)).toBe(true)
      expect(pred(null)).toBe(false)
    })

    test("type coercion rejection", () => {
      const pred = relationOps.getFilterPredicate({ operator: "not_equals", value: "42" }, def)
      expect(pred(42)).toBe(true)
    })
  })

  describe("is_empty", () => {
    test("matches null, undefined, and empty string", () => {
      const pred = relationOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred(null)).toBe(true)
      expect(pred(undefined)).toBe(true)
      expect(pred("")).toBe(true)
    })

    test("does not match non-empty strings", () => {
      const pred = relationOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred("page-1")).toBe(false)
    })

    test("does not match non-string truthy values", () => {
      const pred = relationOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred(0)).toBe(false)
      expect(pred(false)).toBe(false)
    })
  })

  describe("is_not_empty", () => {
    test("matches non-empty strings", () => {
      const pred = relationOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred("page-1")).toBe(true)
    })

    test("does not match null, undefined, or empty string", () => {
      const pred = relationOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred(null)).toBe(false)
      expect(pred(undefined)).toBe(false)
      expect(pred("")).toBe(false)
    })

    test("matches non-string truthy values", () => {
      const pred = relationOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred(0)).toBe(true)
      expect(pred(false)).toBe(true)
    })
  })

  describe("unknown operator", () => {
    test("defaults to true (permissive fallback)", () => {
      const pred = relationOps.getFilterPredicate({ operator: "contains" }, def)
      expect(pred("page-1")).toBe(true)
      expect(pred(null)).toBe(true)
    })
  })
})

describe("relationOps.getFilterPredicate boundary cases", () => {
  const cases: Array<[string, FilterConfig, ReadonlyJSONValue, boolean]> = [
    ["equals: null matches null", { operator: "equals", value: null }, null, true],

    ["equals: empty string matches empty string", { operator: "equals", value: "" }, "", true],

    ["not_equals: empty string vs null", { operator: "not_equals", value: null }, "", true],

    ["is_not_empty: whitespace", { operator: "is_not_empty" }, " ", true],

    ["is_empty: whitespace is not empty", { operator: "is_empty" }, " ", false],

    [
      "not_equals: same value rejected",
      { operator: "not_equals", value: "page-1" },
      "page-1",
      false,
    ],

    ["equals: different value rejected", { operator: "equals", value: "page-1" }, "page-2", false],
  ]

  for (const [label, config, value, expected] of cases) {
    test(label, () => {
      expect(relationOps.getFilterPredicate(config, def)(value)).toBe(expected)
    })
  }
})
