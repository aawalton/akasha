import { describe, expect, test } from "bun:test"
import { jsonEqual } from "./json-equal"

describe("jsonEqual", () => {
  test("identical primitives are equal", () => {
    expect(jsonEqual(1, 1)).toBe(true)
    expect(jsonEqual("a", "a")).toBe(true)
    expect(jsonEqual(true, true)).toBe(true)
    expect(jsonEqual(null, null)).toBe(true)
  })

  test("differing primitives are unequal", () => {
    expect(jsonEqual(1, 2)).toBe(false)
    expect(jsonEqual("a", "b")).toBe(false)
    expect(jsonEqual(0, false)).toBe(false)
  })

  test("null and undefined are distinct", () => {
    expect(jsonEqual(null, undefined)).toBe(false)
    expect(jsonEqual(undefined, {})).toBe(false)
    expect(jsonEqual(null, {})).toBe(false)
  })

  test("objects compare by key set + values, order-insensitive", () => {
    expect(jsonEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
    expect(jsonEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
    expect(jsonEqual({ a: 1 }, { a: 2 })).toBe(false)
  })

  test("arrays are order- and length-sensitive", () => {
    expect(jsonEqual([1, 2, 3], [1, 2, 3])).toBe(true)
    expect(jsonEqual([1, 2, 3], [3, 2, 1])).toBe(false)
    expect(jsonEqual([1, 2], [1, 2, 3])).toBe(false)
  })

  test("arrays and objects of the same content are not equal", () => {
    expect(jsonEqual([], {})).toBe(false)
  })

  test("recurses through nested structures", () => {
    const a = { current: 2, total: 4, entries: { x: { current: 1, total: 2 } } }
    const b = { total: 4, current: 2, entries: { x: { total: 2, current: 1 } } }
    expect(jsonEqual(a, b)).toBe(true)
  })

  test("detects a nested difference", () => {
    const a = { current: 2, total: 4, entries: { x: { current: 1, total: 2 } } }
    const b = { current: 2, total: 4, entries: { x: { current: 1, total: 3 } } }
    expect(jsonEqual(a, b)).toBe(false)
  })

  test("a freshly-allocated structurally-identical value is equal (recursion-guard scenario)", () => {
    const stored = { current: 3, total: 5 }
    const recomputed = { current: 3, total: 5 }
    expect(jsonEqual(recomputed, stored)).toBe(true)
  })
})
