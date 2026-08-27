import { describe, expect, test } from "bun:test"
import { latestFrontierMs, toMs } from "./revealed-frontier"

const T1 = "2026-07-01T00:00:00.000Z"
const T2 = "2026-07-02T00:00:00.000Z"
const T3 = "2026-07-03T00:00:00.000Z"
const T4 = "2026-07-04T00:00:00.000Z"
const ms = (iso: string): number => Date.parse(iso)

describe("toMs", () => {
  test("a finite number passes through; NaN degrades to null", () => {
    expect(toMs(1234)).toBe(1234)
    expect(toMs(Number.NaN)).toBeNull()
  })

  test("an ISO string parses to epoch-ms; garbage degrades to null", () => {
    expect(toMs(T1)).toBe(ms(T1))
    expect(toMs("not-a-date")).toBeNull()
  })

  test("a non-number, non-string value degrades to null", () => {
    expect(toMs(null)).toBeNull()
    expect(toMs(undefined)).toBeNull()
    expect(toMs({})).toBeNull()
  })
})

describe("latestFrontierMs", () => {
  test("an empty set has no frontier (null)", () => {
    expect(latestFrontierMs([], "publishedAt", "createdAt")).toBeNull()
  })

  test("all-unstamped rows fall back to createdAt and take the max", () => {
    const rows = [{ createdAt: T1 }, { createdAt: T3 }, { createdAt: T2 }]
    expect(latestFrontierMs(rows, "publishedAt", "createdAt")).toBe(ms(T3))
  })

  test("a stamped row uses its semantic instant, not its createdAt", () => {
    const rows = [{ createdAt: T1, publishedAt: T3 }]
    expect(latestFrontierMs(rows, "publishedAt", "createdAt")).toBe(ms(T3))
  })

  test("THE regression: an unstamped row created after a stamped row's publish still advances the frontier", () => {
    const rows = [{ createdAt: T2, publishedAt: T1 }, { createdAt: T3 }]
    expect(latestFrontierMs(rows, "publishedAt", "createdAt")).toBe(ms(T3))
  })

  test("mixed rows coalesce per row then take the global max", () => {
    const rows = [
      { createdAt: T1, publishedAt: T4 },
      { createdAt: T2 },
      { createdAt: T3, publishedAt: T1 },
    ]
    expect(latestFrontierMs(rows, "publishedAt", "createdAt")).toBe(ms(T4))
  })

  test("an unparseable preferred value falls back to createdAt for that row", () => {
    const rows = [{ createdAt: T2, publishedAt: "garbage" }]
    expect(latestFrontierMs(rows, "publishedAt", "createdAt")).toBe(ms(T2))
  })

  test("a row with neither key contributes nothing", () => {
    const rows = [{ createdAt: T2 }, { unrelated: T4 }]
    expect(latestFrontierMs(rows, "publishedAt", "createdAt")).toBe(ms(T2))
  })

  test("works for the state source (revealedAt preferred over createdAt)", () => {
    const rows = [{ createdAt: T1, revealedAt: T3 }]
    expect(latestFrontierMs(rows, "revealedAt", "createdAt")).toBe(ms(T3))
  })
})
