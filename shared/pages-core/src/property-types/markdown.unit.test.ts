import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { markdownOps } from "./markdown"

const def: PropertyDefinition = { id: "m", title: "Markdown", type: "markdown" }

describe("markdownOps", () => {
  test("validate returns null", () => {
    expect(markdownOps.validate("# hi", def)).toBeNull()
  })

  test("getSortValue", () => {
    expect(markdownOps.getSortValue("abc")).toBe("abc")
    expect(markdownOps.getSortValue("")).toBeNull()
  })

  test("getFilterOperators returns the markdown subset (4 operators)", () => {
    expect(markdownOps.getFilterOperators(def)).toEqual([
      { value: "contains", label: "Contains" },
      { value: "not_contains", label: "Does not contain" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })

  test("getFilterPredicate uses textFilterPredicate semantics", () => {
    expect(
      markdownOps.getFilterPredicate({ operator: "contains", value: "hi" }, def)("# hi there")
    ).toBe(true)
    expect(
      markdownOps.getFilterPredicate({ operator: "not_contains", value: "zz" }, def)("# hi")
    ).toBe(true)
    expect(markdownOps.getFilterPredicate({ operator: "is_empty", value: "" }, def)("")).toBe(true)
    expect(markdownOps.getFilterPredicate({ operator: "is_not_empty", value: "" }, def)("x")).toBe(
      true
    )
  })
})

describe("markdownOps edge cases", () => {
  test("validate returns null for any input (passthrough)", () => {
    expect(markdownOps.validate(null, def)).toBeNull()
    expect(markdownOps.validate(undefined, def)).toBeNull()
    expect(markdownOps.validate("", def)).toBeNull()
    expect(markdownOps.validate(42, def)).toBeNull()
  })

  test("getSortValue coerces and nullifies empty", () => {
    expect(markdownOps.getSortValue(null)).toBeNull()
    expect(markdownOps.getSortValue(undefined)).toBeNull()
    expect(markdownOps.getSortValue("")).toBeNull()
    expect(markdownOps.getSortValue(42)).toBe("42")
    expect(markdownOps.getSortValue("# heading\nbody")).toBe("# heading\nbody")
  })

  test("getFilterPredicate is case-insensitive", () => {
    expect(
      markdownOps.getFilterPredicate({ operator: "contains", value: "HELLO" }, def)("# hello world")
    ).toBe(true)
    expect(
      markdownOps.getFilterPredicate({ operator: "contains", value: "hello" }, def)("# HELLO WORLD")
    ).toBe(true)
  })

  test("getFilterPredicate handles null/undefined values", () => {
    expect(markdownOps.getFilterPredicate({ operator: "is_empty", value: "" }, def)(null)).toBe(
      true
    )
    expect(
      markdownOps.getFilterPredicate({ operator: "is_empty", value: "" }, def)(undefined)
    ).toBe(true)
    expect(markdownOps.getFilterPredicate({ operator: "contains", value: "x" }, def)(null)).toBe(
      false
    )
  })

  test("getFilterPredicate still supports equals/not_equals even though not in operator list", () => {
    expect(markdownOps.getFilterPredicate({ operator: "equals", value: "# hi" }, def)("# hi")).toBe(
      true
    )
    expect(
      markdownOps.getFilterPredicate({ operator: "not_equals", value: "# hi" }, def)("# bye")
    ).toBe(true)
  })

  test("getFilterPredicate unknown operator defaults to true", () => {
    expect(markdownOps.getFilterPredicate({ operator: "gt", value: "" }, def)("# anything")).toBe(
      true
    )
  })
})
