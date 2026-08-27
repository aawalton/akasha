import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { pathSelectOps } from "./path-select"
import type { FilterConfig } from "./types"

const def: PropertyDefinition = {
  id: "p",
  title: "Path",
  type: "path-select",
  config: { providerId: "tasks-completion-item-path" },
}

const boundedDef: PropertyDefinition = {
  ...def,
  config: { providerId: "tasks-completion-item-path", requiredDepth: 2, maxDepth: 4 },
}

const dashSeparatorDef: PropertyDefinition = {
  ...def,
  config: { providerId: "p", separator: " / " },
}

describe("pathSelectOps.validate", () => {
  test("accepts null and undefined", () => {
    expect(pathSelectOps.validate(null, def)).toBeNull()
    expect(pathSelectOps.validate(undefined, def)).toBeNull()
  })

  test("rejects non-array", () => {
    expect(pathSelectOps.validate("foo", def)).toBe("path-select value must be an array")
    expect(pathSelectOps.validate(42, def)).toBe("path-select value must be an array")
    expect(pathSelectOps.validate({ a: 1 }, def)).toBe("path-select value must be an array")
  })

  test("accepts string segments", () => {
    expect(pathSelectOps.validate(["combat", "light-armor"], def)).toBeNull()
  })

  test("accepts number segments", () => {
    expect(pathSelectOps.validate([1, 5, 423], def)).toBeNull()
  })

  test("accepts mixed string and number segments", () => {
    expect(pathSelectOps.validate(["combat", 5, "annulment"], def)).toBeNull()
  })

  test("rejects non-string non-number segments", () => {
    expect(pathSelectOps.validate([true], def)).toBe(
      "path-select segments must be strings or numbers"
    )
    expect(pathSelectOps.validate([null], def)).toBe(
      "path-select segments must be strings or numbers"
    )
    expect(pathSelectOps.validate([{ a: 1 }], def)).toBe(
      "path-select segments must be strings or numbers"
    )
  })

  test("accepts empty array (no required depth)", () => {
    expect(pathSelectOps.validate([], def)).toBeNull()
  })

  test("rejects values shorter than requiredDepth", () => {
    expect(pathSelectOps.validate(["a"], boundedDef)).toBe("Path must have at least 2 segments")
    expect(pathSelectOps.validate([], boundedDef)).toBe("Path must have at least 2 segments")
  })

  test("accepts values at or above requiredDepth", () => {
    expect(pathSelectOps.validate(["a", "b"], boundedDef)).toBeNull()
    expect(pathSelectOps.validate(["a", "b", "c"], boundedDef)).toBeNull()
  })

  test("rejects values above maxDepth", () => {
    expect(pathSelectOps.validate(["a", "b", "c", "d", "e"], boundedDef)).toBe(
      "Path must have at most 4 segments"
    )
  })

  test("loose-on-read: validate does not check tree-traversal validity", () => {
    expect(pathSelectOps.validate(["does-not-exist", "in-any-tree"], def)).toBeNull()
  })
})

describe("pathSelectOps.getSortValue", () => {
  test("returns null for empty / nullish", () => {
    expect(pathSelectOps.getSortValue([], def)).toBeNull()
    expect(pathSelectOps.getSortValue(null, def)).toBeNull()
    expect(pathSelectOps.getSortValue(undefined, def)).toBeNull()
  })

  test("returns null for non-array", () => {
    expect(pathSelectOps.getSortValue("string", def)).toBeNull()
    expect(pathSelectOps.getSortValue(42, def)).toBeNull()
  })

  test("joins segments with default separator ' > '", () => {
    expect(pathSelectOps.getSortValue(["combat", "light-armor", "annulment"], def)).toBe(
      "combat > light-armor > annulment"
    )
  })

  test("joins segments with configured separator", () => {
    expect(pathSelectOps.getSortValue(["combat", "light-armor"], dashSeparatorDef)).toBe(
      "combat / light-armor"
    )
  })

  test("renders mixed string and number segments", () => {
    expect(pathSelectOps.getSortValue([1, "subcat", 423], def)).toBe("1 > subcat > 423")
  })

  test("uses default separator when definition omitted", () => {
    expect(pathSelectOps.getSortValue(["a", "b"])).toBe("a > b")
  })

  test("drops segments that are neither string nor number", () => {
    expect(pathSelectOps.getSortValue(["a", true, "b"], def)).toBe("a > b")
  })
})

describe("pathSelectOps.getFilterOperators", () => {
  test("returns path_starts_with, is_empty, is_not_empty", () => {
    expect(pathSelectOps.getFilterOperators(def)).toEqual([
      { value: "path_starts_with", label: "Path starts with" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })
})

describe("pathSelectOps.getFilterPredicate", () => {
  const makePred = (c: FilterConfig) => pathSelectOps.getFilterPredicate(c, def)

  describe("path_starts_with", () => {
    test("matches when stored path begins with the filter prefix", () => {
      expect(
        makePred({ operator: "path_starts_with", value: ["combat"] })(["combat", "light-armor"])
      ).toBe(true)
      expect(
        makePred({ operator: "path_starts_with", value: ["combat", "light-armor"] })([
          "combat",
          "light-armor",
          "annulment",
        ])
      ).toBe(true)
    })

    test("does not match when prefix diverges", () => {
      expect(
        makePred({ operator: "path_starts_with", value: ["combat", "heavy-armor"] })([
          "combat",
          "light-armor",
          "annulment",
        ])
      ).toBe(false)
    })

    test("does not match when stored path is shorter than the prefix", () => {
      expect(
        makePred({ operator: "path_starts_with", value: ["combat", "light-armor"] })(["combat"])
      ).toBe(false)
    })

    test("matches mixed string/number prefixes against mixed paths", () => {
      expect(
        makePred({ operator: "path_starts_with", value: [1, "subcat"] })([1, "subcat", 423])
      ).toBe(true)
      expect(makePred({ operator: "path_starts_with", value: ["1"] })([1, "subcat", 423])).toBe(
        false
      )
    })

    test("empty prefix matches every non-empty stored path", () => {
      expect(makePred({ operator: "path_starts_with", value: [] })(["combat"])).toBe(true)
    })

    test("undefined filter passes through (no-op)", () => {
      expect(makePred({ operator: "path_starts_with" })(["combat"])).toBe(true)
    })

    test("non-array filter value is treated as undefined (no-op)", () => {
      expect(makePred({ operator: "path_starts_with", value: "combat" })(["combat"])).toBe(true)
    })

    test("nullish stored path does not match a non-empty prefix", () => {
      expect(makePred({ operator: "path_starts_with", value: ["combat"] })(null)).toBe(false)
      expect(makePred({ operator: "path_starts_with", value: ["combat"] })([])).toBe(false)
    })
  })

  describe("is_empty / is_not_empty", () => {
    test("is_empty true for empty array, null, undefined, non-array", () => {
      expect(makePred({ operator: "is_empty" })([])).toBe(true)
      expect(makePred({ operator: "is_empty" })(null)).toBe(true)
      expect(makePred({ operator: "is_empty" })(undefined)).toBe(true)
      expect(makePred({ operator: "is_empty" })("string")).toBe(true)
    })

    test("is_empty false for non-empty array", () => {
      expect(makePred({ operator: "is_empty" })(["a"])).toBe(false)
    })

    test("is_not_empty true for non-empty array", () => {
      expect(makePred({ operator: "is_not_empty" })(["a"])).toBe(true)
    })

    test("is_not_empty false for empty / nullish", () => {
      expect(makePred({ operator: "is_not_empty" })([])).toBe(false)
      expect(makePred({ operator: "is_not_empty" })(null)).toBe(false)
    })
  })

  test("unknown operator defaults to true", () => {
    expect(makePred({ operator: "contains", value: "a" })(["a"])).toBe(true)
  })
})

describe("pathSelectOps purity", () => {
  test("getSortValue does not mutate the definition", () => {
    const snapshot = JSON.stringify(def)
    pathSelectOps.getSortValue(["a", "b"], def)
    pathSelectOps.getSortValue(["c"], dashSeparatorDef)
    expect(JSON.stringify(def)).toBe(snapshot)
  })

  test("repeated calls are stable", () => {
    const v = ["combat", "light-armor", "annulment"]
    const r1 = pathSelectOps.getSortValue(v, def)
    const r2 = pathSelectOps.getSortValue(v, def)
    expect(r1).toBe(r2)
  })

  test("getFilterPredicate returns a callable function", () => {
    const pred = pathSelectOps.getFilterPredicate({ operator: "is_empty" }, def)
    expect(typeof pred).toBe("function")
  })
})
