import { describe, expect, test } from "bun:test"
import type { PageDataJSON, PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { computeRollup, type PageTypePropertiesMap, rollupOps } from "./rollup"
import type { FilterConfig } from "./types"

const def: PropertyDefinition = { id: "rl", title: "Lookup", type: "rollup" }

const emptyTypes: PageTypePropertiesMap = new Map()

describe("computeRollup", () => {
  const pages = [
    { id: "p1", data: { title: "Alice", score: 10, active: true } satisfies PageDataJSON },
    { id: "p2", data: { title: "Bob", score: 20, active: false } satisfies PageDataJSON },
    { id: "p3", data: { title: null, tags: ["a", "b"] } satisfies PageDataJSON },
  ]

  const config = {
    relationPropertyId: "ref",
    targetPropertyId: "title",
  }

  test("returns target property value from related page", () => {
    const currentPageData = { ref: "p1" } satisfies PageDataJSON
    expect(computeRollup(config, currentPageData, pages, emptyTypes)).toBe("Alice")
  })

  test("returns target property value from a different page", () => {
    const currentPageData = { ref: "p2" } satisfies PageDataJSON
    expect(computeRollup(config, currentPageData, pages, emptyTypes)).toBe("Bob")
  })

  test("returns null when target page is not found", () => {
    const currentPageData = { ref: "missing" } satisfies PageDataJSON
    expect(computeRollup(config, currentPageData, pages, emptyTypes)).toBeNull()
  })

  test("returns null when relation value is not a string", () => {
    const currentPageData = { ref: 42 } satisfies PageDataJSON
    expect(computeRollup(config, currentPageData, pages, emptyTypes)).toBeNull()
  })

  test("returns null when relation property is missing", () => {
    const currentPageData = {} satisfies PageDataJSON
    expect(computeRollup(config, currentPageData, pages, emptyTypes)).toBeNull()
  })

  test("returns boolean target property value", () => {
    const boolConfig = { relationPropertyId: "ref", targetPropertyId: "active" }
    const currentPageData = { ref: "p1" } satisfies PageDataJSON
    expect(computeRollup(boolConfig, currentPageData, pages, emptyTypes)).toBe(true)
  })

  test("returns null target property value", () => {
    const currentPageData = { ref: "p3" } satisfies PageDataJSON
    expect(computeRollup(config, currentPageData, pages, emptyTypes)).toBeNull()
  })

  test("returns array target property value", () => {
    const tagsConfig = { relationPropertyId: "ref", targetPropertyId: "tags" }
    const currentPageData = { ref: "p3" } satisfies PageDataJSON
    expect(computeRollup(tagsConfig, currentPageData, pages, emptyTypes)).toEqual(["a", "b"])
  })

  test("returns object target property value", () => {
    const objPages = [{ id: "p1", data: { meta: { key: "val" } } satisfies PageDataJSON }]
    const metaConfig = { relationPropertyId: "ref", targetPropertyId: "meta" }
    const currentPageData = { ref: "p1" } satisfies PageDataJSON
    expect(computeRollup(metaConfig, currentPageData, objPages, emptyTypes)).toEqual({ key: "val" })
  })

  test("handles empty string relation value", () => {
    const currentPageData = { ref: "" } satisfies PageDataJSON
    expect(computeRollup(config, currentPageData, pages, emptyTypes)).toBeNull()
  })

  test("handles empty allPages array", () => {
    const currentPageData = { ref: "p1" } satisfies PageDataJSON
    expect(computeRollup(config, currentPageData, [], emptyTypes)).toBeNull()
  })

  test("returns null when target property is missing from target page", () => {
    const currentPageData = { ref: "p1" } satisfies PageDataJSON
    const missingPropConfig = { relationPropertyId: "ref", targetPropertyId: "missing" }
    expect(computeRollup(missingPropConfig, currentPageData, pages, emptyTypes)).toBeNull()
  })
})

describe("rollupOps.validate", () => {
  test("always returns null (rollups are computed, not user-set)", () => {
    expect(rollupOps.validate(null, def)).toBeNull()
    expect(rollupOps.validate(undefined, def)).toBeNull()
    expect(rollupOps.validate(42, def)).toBeNull()
    expect(rollupOps.validate("hello", def)).toBeNull()
    expect(rollupOps.validate([], def)).toBeNull()
  })

  test("returns null for boolean, array, and object inputs", () => {
    expect(rollupOps.validate(true, def)).toBeNull()
    expect(rollupOps.validate(false, def)).toBeNull()
    expect(rollupOps.validate([1, 2], def)).toBeNull()
    expect(rollupOps.validate({ key: "val" }, def)).toBeNull()
  })
})

describe("rollupOps.getSortValue", () => {
  test("returns string for string values", () => {
    expect(rollupOps.getSortValue("Alice", def)).toBe("Alice")
    expect(rollupOps.getSortValue("hello", def)).toBe("hello")
  })

  test("returns empty string for empty string (string, NOT coerced)", () => {
    expect(rollupOps.getSortValue("", def)).toBe("")
  })

  test("returns number for numeric values", () => {
    expect(rollupOps.getSortValue(42, def)).toBe(42)
    expect(rollupOps.getSortValue(0, def)).toBe(0)
    expect(rollupOps.getSortValue(-5, def)).toBe(-5)
  })

  test("returns string for numeric strings (NOT coerced to number)", () => {
    expect(rollupOps.getSortValue("42", def)).toBe("42")
  })

  test("returns null for null and undefined", () => {
    expect(rollupOps.getSortValue(null, def)).toBeNull()
    expect(rollupOps.getSortValue(undefined, def)).toBeNull()
  })

  test("returns null for boolean values", () => {
    expect(rollupOps.getSortValue(true, def)).toBeNull()
    expect(rollupOps.getSortValue(false, def)).toBeNull()
  })

  test("returns null for object values", () => {
    expect(rollupOps.getSortValue({}, def)).toBeNull()
    expect(rollupOps.getSortValue({ key: "val" }, def)).toBeNull()
  })

  test("returns null for array values", () => {
    expect(rollupOps.getSortValue([], def)).toBeNull()
    expect(rollupOps.getSortValue(["a"], def)).toBeNull()
  })
})

describe("rollupOps.getFilterOperators", () => {
  test("returns exact operator list with labels", () => {
    expect(rollupOps.getFilterOperators(def)).toEqual([
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })

  test("returns a fresh array each call (no shared mutable state)", () => {
    const a = rollupOps.getFilterOperators(def)
    const b = rollupOps.getFilterOperators(def)
    expect(a).not.toBe(b)
    expect(a).toEqual(b)
  })
})

describe("rollupOps.getFilterPredicate", () => {
  describe("is_empty", () => {
    test("matches null and undefined", () => {
      const pred = rollupOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred(null)).toBe(true)
      expect(pred(undefined)).toBe(true)
    })

    test("does not match empty string (not null/undefined)", () => {
      const pred = rollupOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred("")).toBe(false)
    })

    test("does not match 0 (not null/undefined)", () => {
      const pred = rollupOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred(0)).toBe(false)
    })

    test("does not match false (not null/undefined)", () => {
      const pred = rollupOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred(false)).toBe(false)
    })

    test("does not match empty array (not null/undefined)", () => {
      const pred = rollupOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred([])).toBe(false)
    })

    test("does not match non-empty strings", () => {
      const pred = rollupOps.getFilterPredicate({ operator: "is_empty" }, def)
      expect(pred("Alice")).toBe(false)
    })
  })

  describe("is_not_empty", () => {
    test("matches strings and numbers", () => {
      const pred = rollupOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred("Alice")).toBe(true)
      expect(pred(42)).toBe(true)
    })

    test("does not match null and undefined", () => {
      const pred = rollupOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred(null)).toBe(false)
      expect(pred(undefined)).toBe(false)
    })

    test("matches empty string (not null/undefined)", () => {
      const pred = rollupOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred("")).toBe(true)
    })

    test("matches false (not null/undefined)", () => {
      const pred = rollupOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred(false)).toBe(true)
    })

    test("matches empty array (not null/undefined)", () => {
      const pred = rollupOps.getFilterPredicate({ operator: "is_not_empty" }, def)
      expect(pred([])).toBe(true)
    })
  })

  describe("unknown operator", () => {
    test("defaults to true (permissive fallback)", () => {
      const pred = rollupOps.getFilterPredicate({ operator: "contains" }, def)
      expect(pred("Alice")).toBe(true)
      expect(pred(null)).toBe(true)
    })
  })
})

describe("rollupOps.getFilterPredicate boundary cases", () => {
  const cases: Array<[string, FilterConfig, ReadonlyJSONValue | undefined, boolean]> = [
    ["is_empty: null", { operator: "is_empty" }, null, true],
    ["is_empty: undefined", { operator: "is_empty" }, undefined, true],

    ["is_not_empty: 'Alice'", { operator: "is_not_empty" }, "Alice", true],
    ["is_not_empty: 0", { operator: "is_not_empty" }, 0, true],
    ["is_not_empty: empty string", { operator: "is_not_empty" }, "", true],
    ["is_not_empty: false", { operator: "is_not_empty" }, false, true],

    ["is_empty: 0 is not empty", { operator: "is_empty" }, 0, false],
    ["is_empty: false is not empty", { operator: "is_empty" }, false, false],
    ["is_empty: empty string is not empty", { operator: "is_empty" }, "", false],
  ]

  for (const [label, config, value, expected] of cases) {
    test(label, () => {
      expect(rollupOps.getFilterPredicate(config, def)(value)).toBe(expected)
    })
  }
})
