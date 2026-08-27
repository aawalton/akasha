import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { jsonOps } from "./json"

const def: PropertyDefinition = { id: "j", title: "JSON", type: "json" }

describe("jsonOps", () => {
  test("validate returns null", () => {
    expect(jsonOps.validate({ a: 1 }, def)).toBeNull()
  })

  test("getSortValue returns null (no-op)", () => {
    expect(jsonOps.getSortValue({ a: 1 })).toBeNull()
  })

  test("getFilterOperators returns only empty/not_empty", () => {
    expect(jsonOps.getFilterOperators(def)).toEqual([
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })

  test("getFilterPredicate is_empty matches null, empty string, empty array, empty object", () => {
    const pred = jsonOps.getFilterPredicate({ operator: "is_empty", value: null }, def)
    expect(pred(null)).toBe(true)
    expect(pred("")).toBe(true)
    expect(pred([])).toBe(true)
    expect(pred({})).toBe(true)
    expect(pred({ a: 1 })).toBe(false)
    expect(pred([1])).toBe(false)
    expect(pred("x")).toBe(false)
  })

  test("getFilterPredicate is_not_empty is the inverse", () => {
    const pred = jsonOps.getFilterPredicate({ operator: "is_not_empty", value: null }, def)
    expect(pred(null)).toBe(false)
    expect(pred({})).toBe(false)
    expect(pred({ a: 1 })).toBe(true)
    expect(pred([1])).toBe(true)
  })
})

describe("jsonOps edge cases", () => {
  test("validate always returns null regardless of input", () => {
    expect(jsonOps.validate(null, def)).toBeNull()
    expect(jsonOps.validate(undefined, def)).toBeNull()
    expect(jsonOps.validate("string", def)).toBeNull()
    expect(jsonOps.validate(42, def)).toBeNull()
    expect(jsonOps.validate(false, def)).toBeNull()
    expect(jsonOps.validate([1, 2, 3], def)).toBeNull()
    expect(jsonOps.validate({ nested: { a: 1 } }, def)).toBeNull()
  })

  test("getSortValue always returns null", () => {
    expect(jsonOps.getSortValue(null)).toBeNull()
    expect(jsonOps.getSortValue("x")).toBeNull()
    expect(jsonOps.getSortValue(42)).toBeNull()
    expect(jsonOps.getSortValue([])).toBeNull()
    expect(jsonOps.getSortValue({ a: 1 })).toBeNull()
  })

  test("is_empty treats booleans and numbers as non-empty", () => {
    const pred = jsonOps.getFilterPredicate({ operator: "is_empty", value: null }, def)
    expect(pred(true)).toBe(false)
    expect(pred(false)).toBe(false)
    expect(pred(0)).toBe(false)
    expect(pred(42)).toBe(false)
  })

  test("is_empty detects undefined as empty", () => {
    const pred = jsonOps.getFilterPredicate({ operator: "is_empty", value: null }, def)
    expect(pred(undefined)).toBe(true)
  })

  test("is_empty for nested non-empty structures is false", () => {
    const pred = jsonOps.getFilterPredicate({ operator: "is_empty", value: null }, def)
    expect(pred({ a: { b: 1 } })).toBe(false)
    expect(pred([[]])).toBe(false)
    expect(pred({ a: {} })).toBe(false)
  })

  test("getFilterPredicate unknown operator defaults to true", () => {
    expect(jsonOps.getFilterPredicate({ operator: "contains", value: null }, def)({ a: 1 })).toBe(
      true
    )
  })
})
