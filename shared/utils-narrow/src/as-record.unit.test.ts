import { describe, expect, test } from "bun:test"
import { asRecord } from "./as-record"

describe("asRecord", () => {
  test("returns the value for an empty object literal", () => {
    const value = {}
    expect(asRecord(value)).toBe(value)
  })

  test("returns the value for a populated object literal", () => {
    const value = { a: 1 }
    expect(asRecord(value)).toBe(value)
  })

  test("returns undefined for null", () => {
    expect(asRecord(null)).toBeUndefined()
  })

  test("returns undefined for undefined", () => {
    expect(asRecord(undefined)).toBeUndefined()
  })

  test("returns undefined for an empty array", () => {
    expect(asRecord([])).toBeUndefined()
  })

  test("returns undefined for a populated array", () => {
    expect(asRecord([1, 2])).toBeUndefined()
  })

  test("returns undefined for a string", () => {
    expect(asRecord("str")).toBeUndefined()
  })

  test("returns undefined for a number", () => {
    expect(asRecord(42)).toBeUndefined()
  })

  test("returns undefined for a boolean", () => {
    expect(asRecord(true)).toBeUndefined()
  })
})
