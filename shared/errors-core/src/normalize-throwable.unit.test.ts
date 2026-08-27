import { describe, expect, test } from "bun:test"
import { normalizeThrowable } from "./normalize-throwable"

describe("normalizeThrowable", () => {
  test("extracts message and stack from an Error", () => {
    const err = new Error("boom")
    const { message, stack } = normalizeThrowable(err)
    expect(message).toBe("boom")
    expect(stack).toBe(err.stack ?? "")
  })

  test("falls back to the Error name when the message is empty", () => {
    const err = new TypeError("")
    expect(normalizeThrowable(err).message).toBe("TypeError")
  })

  test("returns a non-empty string for a thrown plain object (the bug)", () => {
    const { message } = normalizeThrowable({ foo: "bar" })
    expect(message).not.toBe("[object Object]")
    expect(message).toContain("foo")
  })

  test("never returns '[object Object]' for any object shape", () => {
    for (const value of [{}, { a: 1 }, Object.create(null), { nested: { x: [1, 2] } }]) {
      expect(normalizeThrowable(value).message).not.toBe("[object Object]")
    }
  })

  test("prefers an object's own string message property (ErrorEvent / DOMException shape)", () => {
    expect(normalizeThrowable({ message: "real reason", code: 7 }).message).toBe("real reason")
  })

  test("extracts a string stack property from a non-Error object", () => {
    const value = { message: "x", stack: "at frame (app.js:1:1)" }
    expect(normalizeThrowable(value).stack).toBe("at frame (app.js:1:1)")
  })

  test("returns '' stack for a value without a stack", () => {
    expect(normalizeThrowable({ foo: 1 }).stack).toBe("")
  })

  test("passes a thrown string through", () => {
    expect(normalizeThrowable("plain string error").message).toBe("plain string error")
  })

  test("uses a generic fallback for null and undefined", () => {
    expect(normalizeThrowable(null).message).toBe("Unknown error")
    expect(normalizeThrowable(undefined).message).toBe("Unknown error")
  })

  test("stringifies thrown primitives meaningfully", () => {
    expect(normalizeThrowable(42).message).toBe("42")
    expect(normalizeThrowable(false).message).toBe("false")
  })

  test("does not throw on a circular object and avoids '[object Object]'", () => {
    const circular: { self?: unknown } = {}
    circular.self = circular
    const { message } = normalizeThrowable(circular)
    expect(message).not.toBe("[object Object]")
    expect(message.length).toBeGreaterThan(0)
  })

  test("falls back to the constructor name for an empty serialization", () => {
    expect(normalizeThrowable(new Map()).message).toBe("Map")
  })

  test("truncates the message to the 2048 schema cap", () => {
    const huge = { blob: "x".repeat(5000) }
    expect(normalizeThrowable(huge).message.length).toBeLessThanOrEqual(2048)
  })
})
