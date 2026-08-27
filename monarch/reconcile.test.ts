
import { describe, expect, test } from "bun:test"
import { vanished } from "./reconcile.ts"

function mirror(n: number): readonly string[] {
  return Array.from({ length: n }, (_, i) => `m${i}`)
}

function fetchedAllBut(n: number, missing: number): ReadonlySet<string> {
  return new Set(Array.from({ length: n - missing }, (_, i) => `m${i}`))
}

describe("vanished", () => {
  test("names nothing when the fetch accounted for every mirrored row", () => {
    const { gone, pastCeiling } = vanished(fetchedAllBut(100, 0), mirror(100))
    expect(gone).toEqual([])
    expect(pastCeiling).toBe(false)
  })

  test("names the transactions the fetch did not return, by monarch id", () => {
    const { gone } = vanished(fetchedAllBut(100, 2), mirror(100))
    expect(gone).toEqual(["m98", "m99"])
  })

  test("proceeds at exactly the ceiling, the bound being exclusive", () => {
    expect(vanished(fetchedAllBut(100, 5), mirror(100)).pastCeiling).toBe(false)
  })

  test("refuses one row past the ceiling", () => {
    expect(vanished(fetchedAllBut(100, 6), mirror(100)).pastCeiling).toBe(true)
  })

  test("refuses a fetch that returned a tenth of the mirror", () => {
    const { gone, pastCeiling } = vanished(fetchedAllBut(1000, 900), mirror(1000))
    expect(gone).toHaveLength(900)
    expect(pastCeiling).toBe(true)
  })

  test("measures the proportion against the MIRROR rather than against the fetch", () => {
    expect(vanished(fetchedAllBut(1000, 997), mirror(1000)).pastCeiling).toBe(true)
    expect(vanished(fetchedAllBut(1000, 3), mirror(1000)).pastCeiling).toBe(false)
  })

  test("retires nothing from an empty mirror rather than dividing by it", () => {
    const { gone, pastCeiling } = vanished(new Set<string>(), mirror(0))
    expect(gone).toEqual([])
    expect(pastCeiling).toBe(false)
  })
})
