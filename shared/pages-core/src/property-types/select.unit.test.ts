import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { selectOps } from "./select"
import type { FilterConfig } from "./types"

const def: PropertyDefinition = {
  id: "s",
  title: "Select",
  type: "select",
  config: {
    options: [
      { id: "red", label: "Red" },
      { id: "green", label: "Green" },
      { id: "blue", label: "Blue" },
    ],
  },
}

const manualDef: PropertyDefinition = { ...def, sort: "manual" }
const alphaDef: PropertyDefinition = { ...def, sort: "alpha" }

const emptyDef: PropertyDefinition = { id: "s", title: "Select", type: "select" }

describe("selectOps.validate", () => {
  test("accepts null/empty", () => {
    expect(selectOps.validate(null, def)).toBeNull()
    expect(selectOps.validate(undefined, def)).toBeNull()
    expect(selectOps.validate("", def)).toBeNull()
  })

  test("rejects non-string", () => {
    expect(selectOps.validate(5, def)).toBe("Select value must be a string")
    expect(selectOps.validate(["red"], def)).toBe("Select value must be a string")
  })

  test("rejects unknown option id", () => {
    expect(selectOps.validate("yellow", def)).toBe("Invalid option")
  })

  test("accepts known option id", () => {
    expect(selectOps.validate("green", def)).toBeNull()
  })

  test("rejects any value when config has no options", () => {
    expect(selectOps.validate("red", emptyDef)).toBe("Invalid option")
  })
})

describe("selectOps.getSortValue", () => {
  test("default (no sort field) returns option index", () => {
    expect(selectOps.getSortValue("red", def)).toBe(0)
    expect(selectOps.getSortValue("green", def)).toBe(1)
    expect(selectOps.getSortValue("blue", def)).toBe(2)
  })

  test("default sort orders rows by option order rather than label", () => {
    const rows = ["blue", "red", "green"]
    const sorted = [...rows].sort((a, b) => {
      const sa = selectOps.getSortValue(a, def)
      const sb = selectOps.getSortValue(b, def)
      if (typeof sa !== "number" || typeof sb !== "number") {
        throw new Error("expected numeric sort values for known option ids under default")
      }
      return sa - sb
    })
    expect(sorted).toEqual(["red", "green", "blue"])
  })

  test("default sort returns null for unknown option id", () => {
    expect(selectOps.getSortValue("yellow", def)).toBeNull()
  })

  test("default sort without definition returns raw value", () => {
    expect(selectOps.getSortValue("green")).toBe("green")
  })

  test("alpha sort returns option label", () => {
    expect(selectOps.getSortValue("green", alphaDef)).toBe("Green")
    expect(selectOps.getSortValue("red", alphaDef)).toBe("Red")
    expect(selectOps.getSortValue("blue", alphaDef)).toBe("Blue")
  })

  test("alpha sort falls back to raw id when option is missing", () => {
    expect(selectOps.getSortValue("yellow", alphaDef)).toBe("yellow")
  })

  test("alpha sort without definition returns raw value", () => {
    expect(selectOps.getSortValue("green")).toBe("green")
  })

  test("alpha sort orders rows by label rather than id", () => {
    const rows = ["red", "green", "blue"]
    const sorted = [...rows].sort((a, b) => {
      const sa = selectOps.getSortValue(a, alphaDef)
      const sb = selectOps.getSortValue(b, alphaDef)
      if (typeof sa !== "string" || typeof sb !== "string") {
        throw new Error("expected string sort values for known option ids in alpha mode")
      }
      return sa.localeCompare(sb)
    })
    expect(sorted).toEqual(["blue", "green", "red"])
  })

  test("returns null for non-string values in alpha mode", () => {
    expect(selectOps.getSortValue(null, alphaDef)).toBeNull()
    expect(selectOps.getSortValue(42, alphaDef)).toBeNull()
  })

  test("manual sort returns option index", () => {
    expect(selectOps.getSortValue("red", manualDef)).toBe(0)
    expect(selectOps.getSortValue("green", manualDef)).toBe(1)
    expect(selectOps.getSortValue("blue", manualDef)).toBe(2)
  })

  test("manual sort returns null for unknown option", () => {
    expect(selectOps.getSortValue("yellow", manualDef)).toBeNull()
  })

  test("manual sort returns null for non-string", () => {
    expect(selectOps.getSortValue(null, manualDef)).toBeNull()
    expect(selectOps.getSortValue(5, manualDef)).toBeNull()
  })
})

describe("selectOps.getFilterOperators", () => {
  test("returns 6 operators in order", () => {
    expect(selectOps.getFilterOperators(def)).toEqual([
      { value: "includes", label: "Is any of" },
      { value: "not_includes", label: "Is none of" },
      { value: "equals", label: "Equals" },
      { value: "not_equals", label: "Does not equal" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })
})

describe("selectOps.getFilterPredicate", () => {
  const makePred = (c: FilterConfig) => selectOps.getFilterPredicate(c, def)

  test("equals / not_equals", () => {
    expect(makePred({ operator: "equals", value: "red" })("red")).toBe(true)
    expect(makePred({ operator: "equals", value: "red" })("green")).toBe(false)
    expect(makePred({ operator: "not_equals", value: "red" })("green")).toBe(true)
  })

  test("includes / not_includes with array filter", () => {
    expect(makePred({ operator: "includes", value: ["red", "blue"] })("red")).toBe(true)
    expect(makePred({ operator: "includes", value: ["red", "blue"] })("green")).toBe(false)
    expect(makePred({ operator: "not_includes", value: ["red", "blue"] })("green")).toBe(true)
    expect(makePred({ operator: "not_includes", value: ["red", "blue"] })("red")).toBe(false)
  })

  test("includes/not_includes with undefined filter passes through", () => {
    expect(makePred({ operator: "includes" })("red")).toBe(true)
    expect(makePred({ operator: "not_includes" })("red")).toBe(true)
  })

  test("includes with non-array filter returns false", () => {
    expect(makePred({ operator: "includes", value: "red" })("red")).toBe(false)
  })

  test("is_empty / is_not_empty", () => {
    expect(makePred({ operator: "is_empty" })(null)).toBe(true)
    expect(makePred({ operator: "is_empty" })("")).toBe(true)
    expect(makePred({ operator: "is_empty" })("red")).toBe(false)
    expect(makePred({ operator: "is_not_empty" })("red")).toBe(true)
    expect(makePred({ operator: "is_not_empty" })(null)).toBe(false)
  })

  test("unknown operator defaults to true", () => {
    expect(makePred({ operator: "contains", value: "red" })("red")).toBe(true)
  })
})

describe("selectOps schema edge cases", () => {
  test("definition with no config rejects all values via validate", () => {
    expect(selectOps.validate("red", emptyDef)).toBe("Invalid option")
    expect(selectOps.validate(null, emptyDef)).toBeNull()
  })

  test("definition with empty options array rejects all values", () => {
    const def0: PropertyDefinition = {
      id: "s",
      title: "S",
      type: "select",
      config: { options: [] },
    }
    expect(selectOps.validate("red", def0)).toBe("Invalid option")
    expect(selectOps.getSortValue("red", def0)).toBeNull()
  })

  test("malformed config (wrong shape) parseConfig falls back to defaults", () => {
    const malformed: PropertyDefinition = {
      id: "s",
      title: "S",
      type: "select",
      config: { options: "not-an-array" },
    }
    expect(selectOps.validate("red", malformed)).toBe("Invalid option")
    expect(selectOps.getSortValue("red", malformed)).toBeNull()
  })

  test("config with duplicate option ids — first match wins for label lookup (alpha mode)", () => {
    const dupDef: PropertyDefinition = {
      id: "s",
      title: "S",
      type: "select",
      sort: "alpha",
      config: {
        options: [
          { id: "x", label: "First" },
          { id: "x", label: "Second" },
        ],
      },
    }
    expect(selectOps.getSortValue("x", dupDef)).toBe("First")
    expect(selectOps.validate("x", dupDef)).toBeNull()
  })

  test("manual sort with duplicate ids returns the first occurrence index", () => {
    const dupManual: PropertyDefinition = {
      id: "s",
      title: "S",
      type: "select",
      sort: "manual",
      config: {
        options: [
          { id: "a", label: "A" },
          { id: "b", label: "B" },
          { id: "a", label: "A2" },
        ],
      },
    }
    expect(selectOps.getSortValue("a", dupManual)).toBe(0)
    expect(selectOps.getSortValue("b", dupManual)).toBe(1)
  })
})

describe("selectOps filter predicate matrix", () => {
  type Case = {
    operator: FilterConfig["operator"]
    filter: FilterConfig["value"]
    value: ReadonlyJSONValue | undefined
    expected: boolean
  }

  const cases: Case[] = [
    { operator: "equals", filter: "red", value: "red", expected: true },
    { operator: "equals", filter: "red", value: "blue", expected: false },
    { operator: "equals", filter: "red", value: null, expected: false },
    { operator: "equals", filter: null, value: null, expected: true },
    { operator: "equals", filter: undefined, value: undefined, expected: true },
    { operator: "not_equals", filter: "red", value: "blue", expected: true },
    { operator: "not_equals", filter: "red", value: "red", expected: false },
    { operator: "not_equals", filter: null, value: "red", expected: true },
    { operator: "includes", filter: ["red", "blue"], value: "red", expected: true },
    { operator: "includes", filter: ["red", "blue"], value: "green", expected: false },
    { operator: "includes", filter: [], value: "red", expected: false },
    { operator: "includes", filter: "red", value: "red", expected: false },
    { operator: "includes", filter: undefined, value: "red", expected: true },
    { operator: "includes", filter: undefined, value: null, expected: true },
    { operator: "not_includes", filter: ["red"], value: "blue", expected: true },
    { operator: "not_includes", filter: ["red"], value: "red", expected: false },
    { operator: "not_includes", filter: [], value: "red", expected: true },
    { operator: "not_includes", filter: "red", value: "blue", expected: false },
    { operator: "not_includes", filter: undefined, value: "red", expected: true },
    { operator: "is_empty", filter: undefined, value: null, expected: true },
    { operator: "is_empty", filter: undefined, value: undefined, expected: true },
    { operator: "is_empty", filter: undefined, value: "", expected: true },
    { operator: "is_empty", filter: undefined, value: "red", expected: false },
    { operator: "is_empty", filter: undefined, value: 0, expected: false },
    { operator: "is_not_empty", filter: undefined, value: "red", expected: true },
    { operator: "is_not_empty", filter: undefined, value: null, expected: false },
    { operator: "is_not_empty", filter: undefined, value: "", expected: false },
  ]

  for (const c of cases) {
    test(`${c.operator} filter=${JSON.stringify(c.filter)} value=${JSON.stringify(c.value)} → ${c.expected}`, () => {
      const pred = selectOps.getFilterPredicate({ operator: c.operator, value: c.filter }, def)
      const callPred: (v: ReadonlyJSONValue | undefined) => boolean = pred
      expect(callPred(c.value)).toBe(c.expected)
    })
  }
})

describe("selectOps includes/not_includes complementarity", () => {
  test("over the option universe with array filter, the two are exact complements", () => {
    const filters: ReadonlyArray<readonly string[]> = [
      [],
      ["red"],
      ["red", "blue"],
      ["red", "green", "blue"],
    ]
    const universe: Array<string | null> = ["red", "green", "blue", null]
    for (const f of filters) {
      const inc = selectOps.getFilterPredicate({ operator: "includes", value: f }, def)
      const not = selectOps.getFilterPredicate({ operator: "not_includes", value: f }, def)
      for (const v of universe) {
        expect(inc(v)).toBe(!not(v))
      }
    }
  })
})

describe("selectOps purity", () => {
  test("getFilterPredicate returns a function that depends only on inputs", () => {
    const pred = selectOps.getFilterPredicate({ operator: "equals", value: "red" }, def)
    expect(typeof pred).toBe("function")
    expect(pred("red")).toBe(true)
    expect(pred("red")).toBe(true)
    expect(pred("blue")).toBe(false)
    expect(pred("blue")).toBe(false)
  })

  test("getSortValue does not mutate the definition", () => {
    const snapshot = JSON.stringify(def)
    selectOps.getSortValue("red", def)
    selectOps.getSortValue("green", manualDef)
    expect(JSON.stringify(def)).toBe(snapshot)
  })
})
