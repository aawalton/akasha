import { describe, expect, test } from "bun:test"
import { isJson } from "./is-json"

describe("isJson", () => {
  test("primitives are JSON", () => {
    expect(isJson(null)).toBe(true)
    expect(isJson("hello")).toBe(true)
    expect(isJson(0)).toBe(true)
    expect(isJson(42)).toBe(true)
    expect(isJson(-1.5)).toBe(true)
    expect(isJson(true)).toBe(true)
    expect(isJson(false)).toBe(true)
  })

  test("arrays of JSON are JSON", () => {
    expect(isJson([])).toBe(true)
    expect(isJson([1, "two", null, true])).toBe(true)
    expect(
      isJson([
        [1, 2],
        [3, 4],
      ])
    ).toBe(true)
  })

  test("objects of JSON are JSON", () => {
    expect(isJson({})).toBe(true)
    expect(isJson({ a: 1, b: "two", c: null })).toBe(true)
    expect(isJson({ nested: { deep: [1, { x: true }] } })).toBe(true)
  })

  test("undefined as a property value is rejected (#14272)", () => {
    expect(isJson({ a: undefined })).toBe(false)
    expect(isJson({ a: 1, b: undefined, c: { d: undefined } })).toBe(false)
  })

  test("undefined at the top level is rejected", () => {
    expect(isJson(undefined)).toBe(false)
  })

  test("non-finite numbers are rejected (#14272)", () => {
    expect(isJson(Number.NaN)).toBe(false)
    expect(isJson(Number.POSITIVE_INFINITY)).toBe(false)
    expect(isJson(Number.NEGATIVE_INFINITY)).toBe(false)
    expect(isJson({ a: Number.NaN })).toBe(false)
    expect(isJson([1, Number.POSITIVE_INFINITY])).toBe(false)
  })

  test("sparse-array holes are rejected (#14272)", () => {
    const sparse: unknown[] = Array(2)
    sparse[1] = 1
    expect(isJson(sparse)).toBe(false)
  })

  test("exotic objects that do not survive JSON round-trip are rejected (#14272)", () => {
    expect(isJson(new Date())).toBe(false)
    expect(isJson(new Map([["a", 1]]))).toBe(false)
    expect(isJson(new Set([1]))).toBe(false)
    expect(isJson(/x/)).toBe(false)
  })

  test("functions are not JSON", () => {
    expect(isJson(() => 1)).toBe(false)
    expect(isJson({ fn: () => 1 })).toBe(false)
    expect(isJson([() => 1])).toBe(false)
  })

  test("symbols and bigints are not JSON", () => {
    expect(isJson(Symbol("x"))).toBe(false)
    expect(isJson(1n)).toBe(false)
    expect(isJson({ s: Symbol("x") })).toBe(false)
  })

  test("nested non-JSON propagates failure", () => {
    expect(isJson({ a: { b: { c: () => 1 } } })).toBe(false)
    expect(isJson([1, 2, [3, () => 4]])).toBe(false)
  })
})
