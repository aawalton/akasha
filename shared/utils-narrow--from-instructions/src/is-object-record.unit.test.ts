import { describe, expect, test } from "bun:test"
import { isObjectRecord } from "./is-object-record"
import { isRecord } from "./is-record"

describe("isObjectRecord", () => {
  test("returns true for an empty object literal", () => {
    expect(isObjectRecord({})).toBe(true)
  })

  test("returns true for a populated object literal", () => {
    expect(isObjectRecord({ a: 1 })).toBe(true)
  })

  test("returns false for null", () => {
    expect(isObjectRecord(null)).toBe(false)
  })

  test("returns false for undefined", () => {
    expect(isObjectRecord(undefined)).toBe(false)
  })

  test("returns true for an empty array (array-inclusive)", () => {
    expect(isObjectRecord([])).toBe(true)
  })

  test("returns true for a populated array (array-inclusive)", () => {
    expect(isObjectRecord([1, 2])).toBe(true)
  })

  test("returns false for a string", () => {
    expect(isObjectRecord("str")).toBe(false)
  })

  test("returns false for a number", () => {
    expect(isObjectRecord(42)).toBe(false)
  })

  test("returns false for a boolean", () => {
    expect(isObjectRecord(true)).toBe(false)
  })

  test("admits arrays where the array-exclusive isRecord rejects them (the families differ only on arrays)", () => {
    expect(isObjectRecord([])).toBe(true)
    expect(isRecord([])).toBe(false)
    expect(isObjectRecord({})).toBe(true)
    expect(isRecord({})).toBe(true)
  })
})
