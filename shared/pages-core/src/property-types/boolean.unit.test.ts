import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { booleanOps } from "./boolean"

const def: PropertyDefinition = { id: "c", title: "Boolean", type: "boolean" }

describe("booleanOps", () => {
  test("validate returns null", () => {
    expect(booleanOps.validate(true, def)).toBeNull()
  })

  test("getSortValue returns 1 or 0", () => {
    expect(booleanOps.getSortValue(true)).toBe(1)
    expect(booleanOps.getSortValue(false)).toBe(0)
    expect(booleanOps.getSortValue(null)).toBe(0)
  })

  test("getFilterOperators returns equals and not_equals", () => {
    expect(booleanOps.getFilterOperators(def)).toEqual([
      { value: "equals", label: "Equals" },
      { value: "not_equals", label: "Does not equal" },
    ])
  })

  test("getFilterPredicate equals", () => {
    expect(booleanOps.getFilterPredicate({ operator: "equals", value: true }, def)(true)).toBe(true)
    expect(booleanOps.getFilterPredicate({ operator: "equals", value: true }, def)(false)).toBe(
      false
    )
  })

  test("getFilterPredicate not_equals", () => {
    const pred = booleanOps.getFilterPredicate({ operator: "not_equals", value: true }, def)
    expect(pred(false)).toBe(true)
    expect(pred(true)).toBe(false)
  })
})

describe("booleanOps edge cases", () => {
  test("getSortValue coerces truthy/falsy non-booleans", () => {
    expect(booleanOps.getSortValue("anything")).toBe(1)
    expect(booleanOps.getSortValue(1)).toBe(1)
    expect(booleanOps.getSortValue(0)).toBe(0)
    expect(booleanOps.getSortValue("")).toBe(0)
    expect(booleanOps.getSortValue(undefined)).toBe(0)
    expect(booleanOps.getSortValue([])).toBe(1)
    expect(booleanOps.getSortValue({})).toBe(1)
  })

  test("getFilterPredicate equals null matches any falsy value", () => {
    const pred = booleanOps.getFilterPredicate({ operator: "equals", value: null }, def)
    expect(pred(false)).toBe(true)
    expect(pred(null)).toBe(true)
    expect(pred(undefined)).toBe(true)
    expect(pred("")).toBe(true)
    expect(pred(0)).toBe(true)
    expect(pred(true)).toBe(false)
  })

  test("getFilterPredicate equals true matches any truthy value", () => {
    const pred = booleanOps.getFilterPredicate({ operator: "equals", value: true }, def)
    expect(pred(true)).toBe(true)
    expect(pred(1)).toBe(true)
    expect(pred("x")).toBe(true)
    expect(pred(false)).toBe(false)
    expect(pred(null)).toBe(false)
  })

  test("getFilterPredicate not_equals is the inverse of equals", () => {
    const pred = booleanOps.getFilterPredicate({ operator: "not_equals", value: true }, def)
    expect(pred(null)).toBe(true)
    expect(pred(undefined)).toBe(true)
    expect(pred(0)).toBe(true)
    expect(pred(true)).toBe(false)
  })

  test("getFilterPredicate unknown operator defaults to true", () => {
    expect(booleanOps.getFilterPredicate({ operator: "contains", value: true }, def)(false)).toBe(
      true
    )
  })
})
