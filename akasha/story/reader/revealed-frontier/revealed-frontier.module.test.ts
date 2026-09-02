import { describe, expect, test } from "bun:test"
import { latestFrontierMs, toMs } from "./revealed-frontier.module.code.ts"

describe("toMs", () => {
  test("takes a number as milliseconds already", () => {
    expect(toMs(1700)).toBe(1700)
  })

  test("is null for a number that is NaN", () => {
    expect(toMs(Number.NaN)).toBeNull()
  })

  test("reads an ISO timestamp", () => {
    expect(toMs("2024-01-01T00:00:00.000Z")).toBe(Date.parse("2024-01-01T00:00:00.000Z"))
  })

  test("is null for a string no date can be read from", () => {
    expect(toMs("not a time")).toBeNull()
  })

  test("is null for anything that is neither number nor string", () => {
    expect(toMs(null)).toBeNull()
    expect(toMs(undefined)).toBeNull()
    expect(toMs({})).toBeNull()
  })
})

describe("latestFrontierMs", () => {
  test("is null when there are no rows", () => {
    expect(latestFrontierMs([], "a", "b")).toBeNull()
  })

  test("takes the greatest millisecond among the rows", () => {
    const rows = [{ a: 10 }, { a: 90 }, { a: 40 }]
    expect(latestFrontierMs(rows, "a", "b")).toBe(90)
  })

  test("falls back to the second key where the preferred one is missing", () => {
    const rows = [{ b: 55 }, { a: 20 }]
    expect(latestFrontierMs(rows, "a", "b")).toBe(55)
  })

  test("prefers the first key where both keys hold a time", () => {
    expect(latestFrontierMs([{ a: 5, b: 999 }], "a", "b")).toBe(5)
  })

  test("ignores rows holding neither key", () => {
    expect(latestFrontierMs([{ c: 7 }, { a: 3 }], "a", "b")).toBe(3)
  })

  test("takes zero over nothing rather than treating zero as absent", () => {
    expect(latestFrontierMs([{ a: 0 }], "a", "b")).toBe(0)
  })
})
