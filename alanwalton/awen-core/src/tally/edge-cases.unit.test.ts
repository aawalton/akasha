import { describe, expect, test } from "bun:test"
import { computeTally, TallyCatalogError } from "../tally"
import type { TallyCatalog } from "../tally-catalog"
import { CATALOG, hit, TURNS, turn } from "./fixtures"

describe("computeTally — edge cases", () => {
  test("bare 'There.' matches at start of a turn (lookbehind ^)", () => {
    const r = computeTally(
      [{ externalId: "t", turnNumber: 1, text: "There. Enough said." }],
      CATALOG
    )
    expect(hit(r, 0, "closing-dialect:there-bare").count).toBe(1)
  })

  test("'There was' does not match the bare-There template", () => {
    const r = computeTally(
      [{ externalId: "t", turnNumber: 1, text: "There was a light." }],
      CATALOG
    )
    expect(hit(r, 0, "closing-dialect:there-bare").count).toBe(0)
  })

  test("present-tense 'lets' is caught (the canonical lyric-engine form)", () => {
    const r = computeTally(
      [{ externalId: "t", turnNumber: 1, text: "She lets her hands fall." }],
      CATALOG
    )
    expect(hit(r, 0, "lyric-engine:let").count).toBe(1)
  })

  test("null catalog yields structural stats only, no hits", () => {
    const r = computeTally(TURNS, null)
    expect(r.catalogVersion).toBeNull()
    expect(turn(r, 0).hits).toHaveLength(0)
    expect(r.cumulative.patternTotals).toHaveLength(0)
    expect(r.cumulative.words).toBe(48)
  })

  test("an invalid pattern regex throws TallyCatalogError naming the pattern", () => {
    const bad: TallyCatalog = {
      catalogVersion: 1,
      patterns: [{ id: "broken", family: "template", regex: "(unclosed", provenance: "x" }],
    }
    expect(() => computeTally(TURNS, bad)).toThrow(TallyCatalogError)
    expect(() => computeTally(TURNS, bad)).toThrow(/broken/)
  })

  test("empty turn set yields a zeroed distribution", () => {
    const r = computeTally([], CATALOG)
    expect(r.cumulative.turns).toBe(0)
    expect(r.cumulative.turnLengthWords).toEqual({ mean: 0, median: 0, min: 0, max: 0, stdev: 0 })
  })
})
