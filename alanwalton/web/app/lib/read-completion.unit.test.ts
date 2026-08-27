import { describe, expect, test } from "bun:test"
import { isCompletionAlreadySet, selectCompletionWriteMode } from "./read-completion"

describe("isCompletionAlreadySet", () => {
  test("false for unset values", () => {
    expect(isCompletionAlreadySet(undefined)).toBe(false)
    expect(isCompletionAlreadySet(null)).toBe(false)
    expect(isCompletionAlreadySet("")).toBe(false)
  })

  test("true for a stamped instant (epoch-ms number)", () => {
    expect(isCompletionAlreadySet(1_700_000_000_000)).toBe(true)
  })

  test("true for a stamped instant (ISO string)", () => {
    expect(isCompletionAlreadySet("2026-07-08T00:00:00.000Z")).toBe(true)
  })
})

describe("selectCompletionWriteMode", () => {
  test("native shell → offline enqueue", () => {
    expect(selectCompletionWriteMode(true)).toBe("offline")
  })

  test("website → online write", () => {
    expect(selectCompletionWriteMode(false)).toBe("online")
  })
})
