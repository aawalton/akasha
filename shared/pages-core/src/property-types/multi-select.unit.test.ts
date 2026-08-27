import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { multiSelectOps } from "./multi-select"
import type { FilterConfig } from "./types"

const def: PropertyDefinition = {
  id: "m",
  title: "Tags",
  type: "multi-select",
  config: {
    options: [
      { id: "a", label: "Alpha" },
      { id: "b", label: "Bravo" },
      { id: "c", label: "Charlie" },
    ],
  },
}

const manualDef: PropertyDefinition = { ...def, sort: "manual" }
const alphaDef: PropertyDefinition = { ...def, sort: "alpha" }

describe("multiSelectOps.validate", () => {
  test("accepts null", () => {
    expect(multiSelectOps.validate(null, def)).toBeNull()
    expect(multiSelectOps.validate(undefined, def)).toBeNull()
  })

  test("rejects non-array", () => {
    expect(multiSelectOps.validate("a", def)).toBe("Multi-select value must be an array")
  })

  test("rejects non-string elements", () => {
    expect(multiSelectOps.validate([1, 2], def)).toBe("Multi-select values must be strings")
  })

  test("rejects unknown option id", () => {
    expect(multiSelectOps.validate(["a", "z"], def)).toBe("Invalid option: z")
  })

  test("accepts known ids", () => {
    expect(multiSelectOps.validate(["a", "b"], def)).toBeNull()
    expect(multiSelectOps.validate([], def)).toBeNull()
  })
})

describe("multiSelectOps.getSortValue", () => {
  test("default (no sort field) returns minimum option index", () => {
    expect(multiSelectOps.getSortValue(["b", "a"], def)).toBe(0)
    expect(multiSelectOps.getSortValue(["c", "b"], def)).toBe(1)
    expect(multiSelectOps.getSortValue(["c"], def)).toBe(2)
  })

  test("default sort ignores unknown ids, uses known minimum", () => {
    expect(multiSelectOps.getSortValue(["z", "b"], def)).toBe(1)
  })

  test("default sort returns null when no known ids match", () => {
    expect(multiSelectOps.getSortValue(["z"], def)).toBeNull()
  })

  test("default sort returns null for empty/non-array", () => {
    expect(multiSelectOps.getSortValue([], def)).toBeNull()
    expect(multiSelectOps.getSortValue(null, def)).toBeNull()
    expect(multiSelectOps.getSortValue("not-array", def)).toBeNull()
  })

  test("default sort drops non-string entries before index lookup", () => {
    expect(multiSelectOps.getSortValue(["b", 1, "a"], def)).toBe(0)
  })

  test("alpha sort returns sorted joined option labels", () => {
    expect(multiSelectOps.getSortValue(["b", "a"], alphaDef)).toBe("Alpha, Bravo")
    expect(multiSelectOps.getSortValue(["c", "a", "b"], alphaDef)).toBe("Alpha, Bravo, Charlie")
  })

  test("alpha sort without definition falls back to sorted joined ids", () => {
    expect(multiSelectOps.getSortValue(["c", "a", "b"])).toBe("a, b, c")
  })

  test("alpha sort falls back to raw id for orphaned options", () => {
    expect(multiSelectOps.getSortValue(["z", "a"], alphaDef)).toBe("Alpha, z")
  })

  test("alpha sort returns null for empty", () => {
    expect(multiSelectOps.getSortValue([], alphaDef)).toBeNull()
    expect(multiSelectOps.getSortValue(null, alphaDef)).toBeNull()
    expect(multiSelectOps.getSortValue("not-array", alphaDef)).toBeNull()
  })

  test("alpha sort drops non-string entries", () => {
    expect(multiSelectOps.getSortValue(["a", 1, "b"], alphaDef)).toBe("Alpha, Bravo")
  })

  test("manual sort returns minimum option index", () => {
    expect(multiSelectOps.getSortValue(["b", "a"], manualDef)).toBe(0)
    expect(multiSelectOps.getSortValue(["c", "b"], manualDef)).toBe(1)
    expect(multiSelectOps.getSortValue(["c"], manualDef)).toBe(2)
  })

  test("manual sort ignores unknown ids, uses known minimum", () => {
    expect(multiSelectOps.getSortValue(["z", "b"], manualDef)).toBe(1)
  })

  test("manual sort returns null when no known ids match", () => {
    expect(multiSelectOps.getSortValue(["z"], manualDef)).toBeNull()
    expect(multiSelectOps.getSortValue([], manualDef)).toBeNull()
  })
})

describe("multiSelectOps.getFilterOperators", () => {
  test("returns 4 operators in order", () => {
    expect(multiSelectOps.getFilterOperators(def)).toEqual([
      { value: "includes", label: "Includes any of" },
      { value: "not_includes", label: "Excludes all of" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })
})

describe("multiSelectOps.getFilterPredicate", () => {
  const makePred = (c: FilterConfig) => multiSelectOps.getFilterPredicate(c, def)

  test("includes with array filter matches any overlap", () => {
    expect(makePred({ operator: "includes", value: ["a", "b"] })(["b", "c"])).toBe(true)
    expect(makePred({ operator: "includes", value: ["a"] })(["b", "c"])).toBe(false)
  })

  test("includes with string filter checks membership", () => {
    expect(makePred({ operator: "includes", value: "a" })(["a", "b"])).toBe(true)
    expect(makePred({ operator: "includes", value: "z" })(["a", "b"])).toBe(false)
  })

  test("not_includes array = no overlap", () => {
    expect(makePred({ operator: "not_includes", value: ["a"] })(["b", "c"])).toBe(true)
    expect(makePred({ operator: "not_includes", value: ["a"] })(["a", "b"])).toBe(false)
  })

  test("not_includes string", () => {
    expect(makePred({ operator: "not_includes", value: "z" })(["a", "b"])).toBe(true)
    expect(makePred({ operator: "not_includes", value: "a" })(["a", "b"])).toBe(false)
  })

  test("undefined filter passes through for includes/not_includes", () => {
    expect(makePred({ operator: "includes" })(["a"])).toBe(true)
    expect(makePred({ operator: "not_includes" })(["a"])).toBe(true)
  })

  test("is_empty / is_not_empty", () => {
    expect(makePred({ operator: "is_empty" })([])).toBe(true)
    expect(makePred({ operator: "is_empty" })(["a"])).toBe(false)
    expect(makePred({ operator: "is_empty" })(null)).toBe(true)
    expect(makePred({ operator: "is_not_empty" })(["a"])).toBe(true)
    expect(makePred({ operator: "is_not_empty" })([])).toBe(false)
  })

  test("unknown operator defaults to true", () => {
    expect(makePred({ operator: "contains", value: "a" })(["a"])).toBe(true)
  })
})

describe("multiSelectOps schema edge cases", () => {
  test("definition without config — validate accepts null, rejects ids", () => {
    const noConfig: PropertyDefinition = { id: "m", title: "M", type: "multi-select" }
    expect(multiSelectOps.validate(null, noConfig)).toBeNull()
    expect(multiSelectOps.validate(["a"], noConfig)).toBe("Invalid option: a")
  })

  test("definition with empty options array — same as no config", () => {
    const def0: PropertyDefinition = {
      id: "m",
      title: "M",
      type: "multi-select",
      config: { options: [] },
    }
    expect(multiSelectOps.validate(["a"], def0)).toBe("Invalid option: a")
    expect(multiSelectOps.getSortValue(["a"], def0)).toBeNull()
  })

  test("malformed config falls back to defaults", () => {
    const malformed: PropertyDefinition = {
      id: "m",
      title: "M",
      type: "multi-select",
      config: { options: { not: "an array" } },
    }
    expect(multiSelectOps.validate(["a"], malformed)).toBe("Invalid option: a")
    expect(multiSelectOps.getSortValue(["a"], malformed)).toBeNull()
  })

  test("config with duplicate option ids — validate still passes (alpha mode label lookup)", () => {
    const dupDef: PropertyDefinition = {
      id: "m",
      title: "M",
      type: "multi-select",
      sort: "alpha",
      config: {
        options: [
          { id: "x", label: "First" },
          { id: "x", label: "Second" },
        ],
      },
    }
    expect(multiSelectOps.validate(["x"], dupDef)).toBeNull()
    expect(multiSelectOps.getSortValue(["x"], dupDef)).toBe("First")
  })

  test("manual sort with empty options returns null even for non-empty values", () => {
    const def0: PropertyDefinition = {
      id: "m",
      title: "M",
      type: "multi-select",
      sort: "manual",
      config: { options: [] },
    }
    expect(multiSelectOps.getSortValue(["a", "b"], def0)).toBeNull()
  })
})

describe("multiSelectOps filter predicate matrix", () => {
  type Case = {
    operator: FilterConfig["operator"]
    filter: FilterConfig["value"]
    value: ReadonlyJSONValue | undefined
    expected: boolean
  }

  const cases: Case[] = [
    { operator: "includes", filter: ["a"], value: ["a", "b"], expected: true },
    { operator: "includes", filter: ["a"], value: ["b", "c"], expected: false },
    { operator: "includes", filter: ["a", "b"], value: ["b", "c"], expected: true },
    { operator: "includes", filter: [], value: ["a"], expected: false },
    { operator: "includes", filter: ["a"], value: [], expected: false },
    { operator: "includes", filter: ["a"], value: null, expected: false },
    { operator: "includes", filter: "a", value: ["a", "b"], expected: true },
    { operator: "includes", filter: "z", value: ["a", "b"], expected: false },
    { operator: "includes", filter: undefined, value: ["a"], expected: true },
    { operator: "includes", filter: undefined, value: [], expected: true },
    { operator: "not_includes", filter: ["a"], value: ["b", "c"], expected: true },
    { operator: "not_includes", filter: ["a"], value: ["a", "b"], expected: false },
    { operator: "not_includes", filter: [], value: ["a"], expected: true },
    { operator: "not_includes", filter: ["a"], value: [], expected: true },
    { operator: "not_includes", filter: "z", value: ["a", "b"], expected: true },
    { operator: "not_includes", filter: "a", value: ["a", "b"], expected: false },
    { operator: "not_includes", filter: undefined, value: ["a"], expected: true },
    { operator: "is_empty", filter: undefined, value: [], expected: true },
    { operator: "is_empty", filter: undefined, value: null, expected: true },
    { operator: "is_empty", filter: undefined, value: undefined, expected: true },
    { operator: "is_empty", filter: undefined, value: ["a"], expected: false },
    { operator: "is_empty", filter: undefined, value: "not-array", expected: true },
    { operator: "is_not_empty", filter: undefined, value: ["a"], expected: true },
    { operator: "is_not_empty", filter: undefined, value: [], expected: false },
    { operator: "is_not_empty", filter: undefined, value: null, expected: false },
  ]

  for (const c of cases) {
    test(`${c.operator} filter=${JSON.stringify(c.filter)} value=${JSON.stringify(c.value)} → ${c.expected}`, () => {
      const pred = multiSelectOps.getFilterPredicate({ operator: c.operator, value: c.filter }, def)
      const callPred: (v: ReadonlyJSONValue | undefined) => boolean = pred
      expect(callPred(c.value)).toBe(c.expected)
    })
  }
})

describe("multiSelectOps includes/not_includes complementarity", () => {
  test("over the option universe with array filter, the two are exact complements", () => {
    const filters: ReadonlyArray<readonly string[]> = [[], ["a"], ["a", "b"], ["a", "b", "c"]]
    const universe: Array<readonly string[] | null> = [
      [],
      ["a"],
      ["b"],
      ["c"],
      ["a", "b"],
      ["a", "c"],
      ["b", "c"],
      ["a", "b", "c"],
      null,
    ]
    for (const f of filters) {
      const inc = multiSelectOps.getFilterPredicate({ operator: "includes", value: f }, def)
      const not = multiSelectOps.getFilterPredicate({ operator: "not_includes", value: f }, def)
      for (const v of universe) {
        expect(inc(v)).toBe(!not(v))
      }
    }
  })
})

describe("multiSelectOps purity", () => {
  test("getSortValue does not mutate the definition", () => {
    const snapshot = JSON.stringify(def)
    multiSelectOps.getSortValue(["a", "b"], def)
    multiSelectOps.getSortValue(["b", "a"], manualDef)
    expect(JSON.stringify(def)).toBe(snapshot)
  })

  test("repeated calls are stable", () => {
    const v = ["c", "a", "b"]
    const r1 = multiSelectOps.getSortValue(v, def)
    const r2 = multiSelectOps.getSortValue(v, def)
    expect(r1).toBe(r2)
  })
})
