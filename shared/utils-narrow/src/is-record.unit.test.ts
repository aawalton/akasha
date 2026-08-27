import { describe, expect, test } from "bun:test"
import { isRecord } from "./is-record"

describe("isRecord", () => {
  test("returns true for an empty object literal", () => {
    expect(isRecord({})).toBe(true)
  })

  test("returns true for a populated object literal", () => {
    expect(isRecord({ a: 1 })).toBe(true)
  })

  test("returns false for null", () => {
    expect(isRecord(null)).toBe(false)
  })

  test("returns false for undefined", () => {
    expect(isRecord(undefined)).toBe(false)
  })

  test("returns false for an empty array", () => {
    expect(isRecord([])).toBe(false)
  })

  test("returns false for a populated array", () => {
    expect(isRecord([1, 2])).toBe(false)
  })

  test("returns false for a string", () => {
    expect(isRecord("str")).toBe(false)
  })

  test("returns false for a number", () => {
    expect(isRecord(42)).toBe(false)
  })

  test("returns false for a boolean", () => {
    expect(isRecord(true)).toBe(false)
  })

  test("returns true for a Map (non-array object — caller must further narrow if Map is undesirable)", () => {
    expect(isRecord(new Map())).toBe(true)
  })
})
