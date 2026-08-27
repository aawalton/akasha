import { describe, expect, it } from "bun:test"
import { isPatchNoop } from "./page-equality"

describe("isPatchNoop", () => {
  it("returns true when every key in resolvedSet deep-equals current row", () => {
    const current = { title: "hello", count: 3, done: false, extra: "ignored" }
    const resolvedSet = { title: "hello", count: 3, done: false }
    expect(isPatchNoop(current, resolvedSet)).toBe(true)
  })

  it("returns true when a key is missing on current and resolvedSet sets it to null", () => {
    const current = { title: "hello" }
    const resolvedSet = { completedAt: null }
    expect(isPatchNoop(current, resolvedSet)).toBe(true)
  })

  it("returns false when at least one key differs", () => {
    const current = { title: "old", count: 3 }
    const resolvedSet = { title: "new", count: 3 }
    expect(isPatchNoop(current, resolvedSet)).toBe(false)
  })

  it("returns false when current has a non-null value for a key and resolvedSet sets it to null", () => {
    const current = { completedAt: 12345 }
    const resolvedSet = { completedAt: null }
    expect(isPatchNoop(current, resolvedSet)).toBe(false)
  })

  it("treats JSON objects as deep-equal regardless of key order", () => {
    const current = { meta: { a: 1, b: 2 } }
    const resolvedSet = { meta: { b: 2, a: 1 } }
    expect(isPatchNoop(current, resolvedSet)).toBe(true)
  })

  it("treats nested JSON objects as deep-equal", () => {
    const current = { meta: { a: { x: 1, y: [1, 2, 3] }, b: 2 } }
    const resolvedSet = { meta: { b: 2, a: { y: [1, 2, 3], x: 1 } } }
    expect(isPatchNoop(current, resolvedSet)).toBe(true)
  })

  it("returns false when an object value's nested key differs", () => {
    const current = { meta: { a: 1, b: 2 } }
    const resolvedSet = { meta: { a: 1, b: 3 } }
    expect(isPatchNoop(current, resolvedSet)).toBe(false)
  })

  it("treats arrays as element-wise equal in matching order", () => {
    const current = { tags: ["a", "b", "c"] }
    const resolvedSet = { tags: ["a", "b", "c"] }
    expect(isPatchNoop(current, resolvedSet)).toBe(true)
  })

  it("returns false when array order differs", () => {
    const current = { tags: ["a", "b", "c"] }
    const resolvedSet = { tags: ["c", "b", "a"] }
    expect(isPatchNoop(current, resolvedSet)).toBe(false)
  })

  it("returns false when array length differs", () => {
    const current = { tags: ["a", "b"] }
    const resolvedSet = { tags: ["a", "b", "c"] }
    expect(isPatchNoop(current, resolvedSet)).toBe(false)
  })

  it("ignores keys present in current but absent from resolvedSet", () => {
    const current = { title: "hello", count: 3, extra: "should be ignored" }
    const resolvedSet = { title: "hello" }
    expect(isPatchNoop(current, resolvedSet)).toBe(true)
  })

  it("returns true for an empty resolvedSet (no writes proposed)", () => {
    const current = { title: "hello", count: 3 }
    const resolvedSet = {}
    expect(isPatchNoop(current, resolvedSet)).toBe(true)
  })
})
