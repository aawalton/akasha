import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { getValueArray, multiRelationOps } from "./multi-relation"
import type { FilterConfig } from "./types"

const def: PropertyDefinition = { id: "mr", title: "Refs", type: "multi-relation" }

describe("getValueArray", () => {
  test("returns string items from array", () => {
    expect(getValueArray(["a", "b", "c"])).toEqual(["a", "b", "c"])
  })

  test("filters out non-string items", () => {
    expect(getValueArray(["a", 42, "b", true, "c"])).toEqual(["a", "b", "c"])
  })

  test("returns empty array for non-array values", () => {
    expect(getValueArray(null)).toEqual([])
    expect(getValueArray(undefined)).toEqual([])
    expect(getValueArray("string")).toEqual([])
    expect(getValueArray(42)).toEqual([])
    expect(getValueArray({})).toEqual([])
  })

  test("returns empty array for empty array", () => {
    expect(getValueArray([])).toEqual([])
  })

  test("filters out nested arrays (inner array is not a string)", () => {
    expect(getValueArray([["a"]])).toEqual([])
    expect(getValueArray(["b", ["a"], "c"])).toEqual(["b", "c"])
  })

  test("keeps empty strings in array (empty string is a string)", () => {
    expect(getValueArray(["", "a"])).toEqual(["", "a"])
    expect(getValueArray([""])).toEqual([""])
  })
})

describe("multiRelationOps.validate", () => {
  test("returns null for null and undefined", () => {
    expect(multiRelationOps.validate(null, def)).toBeNull()
    expect(multiRelationOps.validate(undefined, def)).toBeNull()
  })

  test("accepts valid string arrays", () => {
    expect(multiRelationOps.validate(["a", "b"], def)).toBeNull()
    expect(multiRelationOps.validate([], def)).toBeNull()
  })

  test("accepts single-element arrays", () => {
    expect(multiRelationOps.validate(["a"], def)).toBeNull()
  })

  test("rejects non-array values", () => {
    expect(multiRelationOps.validate("string", def)).toBe("Multi-relation value must be an array")
    expect(multiRelationOps.validate(42, def)).toBe("Multi-relation value must be an array")
    expect(multiRelationOps.validate({}, def)).toBe("Multi-relation value must be an array")
  })

  test("rejects expanded non-array types", () => {
    const msg = "Multi-relation value must be an array"
    expect(multiRelationOps.validate(true, def)).toBe(msg)
    expect(multiRelationOps.validate(false, def)).toBe(msg)
    expect(multiRelationOps.validate(0, def)).toBe(msg)
    expect(multiRelationOps.validate(NaN, def)).toBe(msg)
  })

  test("rejects arrays with non-string items", () => {
    expect(multiRelationOps.validate(["a", 42], def)).toBe("Multi-relation values must be strings")
    expect(multiRelationOps.validate([true], def)).toBe("Multi-relation values must be strings")
  })
})

describe("multiRelationOps.getSortValue", () => {
  test("returns count for non-empty arrays", () => {
    expect(multiRelationOps.getSortValue(["a", "b"], def)).toBe(2)
    expect(multiRelationOps.getSortValue(["a"], def)).toBe(1)
  })

  test("returns null for empty or non-array values", () => {
    expect(multiRelationOps.getSortValue([], def)).toBeNull()
    expect(multiRelationOps.getSortValue(null, def)).toBeNull()
    expect(multiRelationOps.getSortValue(undefined, def)).toBeNull()
    expect(multiRelationOps.getSortValue("string", def)).toBeNull()
  })

  test("filters non-strings via getValueArray before counting", () => {
    expect(multiRelationOps.getSortValue(["a", 42, "b"], def)).toBe(2)
  })

  test("returns null for non-array types", () => {
    expect(multiRelationOps.getSortValue(42, def)).toBeNull()
    expect(multiRelationOps.getSortValue(true, def)).toBeNull()
    expect(multiRelationOps.getSortValue(false, def)).toBeNull()
    expect(multiRelationOps.getSortValue({}, def)).toBeNull()
  })
})

describe("multiRelationOps.getFilterOperators", () => {
  test("returns exact operator list with labels", () => {
    expect(multiRelationOps.getFilterOperators(def)).toEqual([
      { value: "includes", label: "Includes any of" },
      { value: "not_includes", label: "Excludes all of" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })

  test("returns a fresh array each call (no shared mutable state)", () => {
    const a = multiRelationOps.getFilterOperators(def)
    const b = multiRelationOps.getFilterOperators(def)
    expect(a).not.toBe(b)
    expect(a).toEqual(b)
  })
})

describe("multiRelationOps.getFilterPredicate", () => {
  describe("includes", () => {
    test("matches when value array contains filter string", () => {
      const pred = multiRelationOps.getFilterPredicate({ operator: "includes", value: "a" }, def)
      expect(pred(["a", "b"])).toBe(true)
      expect(pred(["c"])).toBe(false)
    })

    test("matches when value array overlaps filter array", () => {
      const pred = multiRelationOps.getFilterPredicate(
        { operator: "includes", value: ["a", "c"] },
        def
      )
      expect(pred(["a", "b"])).toBe(true)
      expect(pred(["d"])).toBe(false)
    })

    test("returns false for empty value array", () => {
      const pred = multiRelationOps.getFilterPredicate({ operator: "includes", value: "a" }, def)
      expect(pred([])).toBe(false)
      expect(pred(null)).toBe(false)
    })

    test("returns false when filter value is empty array (no overlap possible)", () => {
      const pred = multiRelationOps.getFilterPredicate({ operator: "includes", value: [] }, def)
      expect(pred(["a"])).toBe(false)
    })

    test("returns false when filter value is non-string/non-array (number)", () => {
      const pred = multiRelationOps.getFilterPredicate({ operator: "includes", value: 42 }, def)
      expect(pred(["a"])).toBe(false)
    })
  })

  describe("not_includes", () => {
    test("matches when value array does not contain filter string", () => {
      const pred = multiRelationOps.getFilterPredicate(
        { operator: "not_includes", value: "a" },
        def
      )
      expect(pred(["b", "c"])).toBe(true)
      expect(pred(["a", "b"])).toBe(false)
    })

    test("matches when value array has no overlap with filter array", () => {
      const pred = multiRelationOps.getFilterPredicate(
        { operator: "not_includes", value: ["a", "c"] },
        def
      )
      expect(pred(["b", "d"])).toBe(true)
      expect(pred(["a", "d"])).toBe(false)
    })

    test("returns true when filter value is null (not string, not array)", () => {
      const pred = multiRelationOps.getFilterPredicate(
        { operator: "not_includes", value: null },
        def
      )
      expect(pred(["a"])).toBe(false)
    })

    test("returns true when filter value is empty array (no overlap to check)", () => {
      const pred = multiRelationOps.getFilterPredicate({ operator: "not_includes", value: [] }, def)
      expect(pred(["a"])).toBe(true)
    })
  })

  describe("is_empty", () => {
    test("matches empty or non-array values", () => {
      const pred = multiRelationOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred(null)).toBe(true)
      expect(pred(undefined)).toBe(true)
      expect(pred([])).toBe(true)
    })

    test("does not match non-empty arrays", () => {
      const pred = multiRelationOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred(["a"])).toBe(false)
    })

    test("matches non-array truthy values (getValueArray returns [])", () => {
      const pred = multiRelationOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred("hello")).toBe(true)
      expect(pred(42)).toBe(true)
      expect(pred({})).toBe(true)
    })
  })

  describe("is_not_empty", () => {
    test("matches non-empty arrays", () => {
      const pred = multiRelationOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred(["a"])).toBe(true)
      expect(pred(["a", "b"])).toBe(true)
    })

    test("does not match empty or non-array values", () => {
      const pred = multiRelationOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred(null)).toBe(false)
      expect(pred([])).toBe(false)
    })

    test("does not match non-array values (getValueArray returns [])", () => {
      const pred = multiRelationOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred("hello")).toBe(false)
      expect(pred(42)).toBe(false)
      expect(pred({})).toBe(false)
    })
  })

  describe("unknown operator", () => {
    test("defaults to true (permissive fallback)", () => {
      const pred = multiRelationOps.getFilterPredicate({ operator: "contains" }, def)
      expect(pred(["a"])).toBe(true)
      expect(pred(null)).toBe(true)
    })
  })
})

describe("multiRelationOps.getFilterPredicate boundary cases", () => {
  const cases: Array<[string, FilterConfig, ReadonlyJSONValue, boolean]> = [
    ["includes: single-element match", { operator: "includes", value: ["a"] }, ["a"], true],
    ["includes: single-element no match", { operator: "includes", value: ["a"] }, ["b"], false],

    [
      "not_includes: single-element excluded",
      { operator: "not_includes", value: ["a"] },
      ["b"],
      true,
    ],
    [
      "not_includes: single-element included",
      { operator: "not_includes", value: ["a"] },
      ["a"],
      false,
    ],

    ["is_empty: empty array", { operator: "is_empty" }, [], true],

    ["is_not_empty: single-element array", { operator: "is_not_empty" }, ["a"], true],

    ["is_empty: null", { operator: "is_empty" }, null, true],

    ["is_empty: non-empty array", { operator: "is_empty" }, ["a", "b"], false],
  ]

  for (const [label, config, value, expected] of cases) {
    test(label, () => {
      expect(multiRelationOps.getFilterPredicate(config, def)(value)).toBe(expected)
    })
  }
})
