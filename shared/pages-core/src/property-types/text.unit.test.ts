import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { textOps } from "./text"
import type { FilterConfig } from "./types"

const def: PropertyDefinition = { id: "t", title: "Text", type: "text" }

describe("textOps", () => {
  test("validate returns null", () => {
    expect(textOps.validate("anything", def)).toBeNull()
    expect(textOps.validate(null, def)).toBeNull()
  })

  test("getSortValue", () => {
    expect(textOps.getSortValue("abc")).toBe("abc")
    expect(textOps.getSortValue("")).toBeNull()
    expect(textOps.getSortValue(null)).toBeNull()
    expect(textOps.getSortValue(undefined)).toBeNull()
  })

  test("getFilterOperators returns the 6 text operators in order", () => {
    expect(textOps.getFilterOperators(def)).toEqual([
      { value: "contains", label: "Contains" },
      { value: "not_contains", label: "Does not contain" },
      { value: "equals", label: "Equals" },
      { value: "not_equals", label: "Does not equal" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })

  test("getFilterPredicate operators", () => {
    const cases: Array<[FilterConfig, ReadonlyJSONValue, boolean]> = [
      [{ operator: "contains", value: "ab" }, "zabra", true],
      [{ operator: "contains", value: "xx" }, "zabra", false],
      [{ operator: "not_contains", value: "xx" }, "zabra", true],
      [{ operator: "equals", value: "foo" }, "foo", true],
      [{ operator: "equals", value: "foo" }, "bar", false],
      [{ operator: "not_equals", value: "foo" }, "bar", true],
      [{ operator: "is_empty", value: "" }, "", true],
      [{ operator: "is_empty", value: "" }, "x", false],
      [{ operator: "is_not_empty", value: "" }, "x", true],
      [{ operator: "is_not_empty", value: "" }, "", false],
    ]
    for (const [config, value, expected] of cases) {
      expect(textOps.getFilterPredicate(config, def)(value)).toBe(expected)
    }
  })
})

describe("textOps edge cases", () => {
  test("getSortValue coerces non-strings", () => {
    expect(textOps.getSortValue(42)).toBe("42")
    expect(textOps.getSortValue(true)).toBe("true")
    expect(textOps.getSortValue(false)).toBe("false")
  })

  test("getFilterPredicate is case-insensitive for contains/equals", () => {
    expect(textOps.getFilterPredicate({ operator: "contains", value: "FOO" }, def)("food")).toBe(
      true
    )
    expect(textOps.getFilterPredicate({ operator: "contains", value: "foo" }, def)("FOOD")).toBe(
      true
    )
    expect(textOps.getFilterPredicate({ operator: "equals", value: "Foo" }, def)("foo")).toBe(true)
    expect(textOps.getFilterPredicate({ operator: "not_equals", value: "foo" }, def)("FOO")).toBe(
      false
    )
  })

  test("getFilterPredicate handles unicode", () => {
    expect(textOps.getFilterPredicate({ operator: "contains", value: "éà" }, def)("café éà")).toBe(
      true
    )
    expect(textOps.getFilterPredicate({ operator: "equals", value: "日本" }, def)("日本")).toBe(
      true
    )
  })

  test("getFilterPredicate treats null/undefined values as empty", () => {
    expect(textOps.getFilterPredicate({ operator: "is_empty", value: "" }, def)(null)).toBe(true)
    expect(textOps.getFilterPredicate({ operator: "is_empty", value: "" }, def)(undefined)).toBe(
      true
    )
    expect(textOps.getFilterPredicate({ operator: "is_not_empty", value: "" }, def)(null)).toBe(
      false
    )
    expect(textOps.getFilterPredicate({ operator: "contains", value: "x" }, def)(null)).toBe(false)
  })

  test("getFilterPredicate coerces non-string values for comparison", () => {
    expect(textOps.getFilterPredicate({ operator: "equals", value: 42 }, def)(42)).toBe(true)
    expect(textOps.getFilterPredicate({ operator: "contains", value: "tru" }, def)(true)).toBe(true)
  })

  test("getFilterPredicate unknown operator defaults to true", () => {
    expect(textOps.getFilterPredicate({ operator: "gt", value: "" }, def)("x")).toBe(true)
  })
})
