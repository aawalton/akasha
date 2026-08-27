import { describe, expect, test } from "bun:test"
import { BoundaryLensSchema, parseTallyCatalog, TallyCatalogSchema } from "./tally-catalog"

const VALID = {
  catalogVersion: 19,
  patterns: [
    { id: "a", family: "template", regex: "\\ba\\b", flags: "gi", provenance: "p" },
    { id: "b", family: "let-verb", regex: "\\blet\\b", provenance: "q" },
  ],
}

describe("TallyCatalogSchema", () => {
  test("a valid catalog parses", () => {
    expect(TallyCatalogSchema.parse(VALID).patterns).toHaveLength(2)
  })

  test("a duplicate pattern id is refused", () => {
    const dup = { ...VALID, patterns: [VALID.patterns[0], { ...VALID.patterns[0] }] }
    expect(() => TallyCatalogSchema.parse(dup)).toThrow(/duplicate pattern id/)
  })

  test("an unknown top-level key is refused (strict spine)", () => {
    expect(() => TallyCatalogSchema.parse({ ...VALID, extra: 1 })).toThrow()
  })

  test("an out-of-enum family is refused structurally", () => {
    const bad = { ...VALID, patterns: [{ ...VALID.patterns[0], family: "gestalt" }] }
    expect(() => TallyCatalogSchema.parse(bad)).toThrow()
  })

  test("a non-integer catalogVersion is refused", () => {
    expect(() => TallyCatalogSchema.parse({ ...VALID, catalogVersion: 1.5 })).toThrow()
  })
})

const VALID_BOUNDARY = {
  runThreshold: 3,
  head: {
    fallback: "ambient-reestablish",
    screens: [{ category: "dialogue", regex: "^\\s*\\[", provenance: "speaker tag" }],
  },
  close: {
    fallback: "resolved",
    screens: [{ category: "poised", regex: "\\bnot yet\\b", flags: "i", provenance: "wait" }],
  },
  youInitial: { regex: "^\\s*You\\b", provenance: "same-word opening; read RUNS not rate" },
}

describe("BoundaryLensSchema (#15717)", () => {
  test("a valid boundary-lens parses", () => {
    expect(BoundaryLensSchema.parse(VALID_BOUNDARY).runThreshold).toBe(3)
  })

  test("runThreshold below 2 is refused", () => {
    expect(() => BoundaryLensSchema.parse({ ...VALID_BOUNDARY, runThreshold: 1 })).toThrow()
  })

  test("an unknown key is refused (strict spine)", () => {
    expect(() => BoundaryLensSchema.parse({ ...VALID_BOUNDARY, extra: 1 })).toThrow()
    expect(() =>
      BoundaryLensSchema.parse({
        ...VALID_BOUNDARY,
        head: { ...VALID_BOUNDARY.head, extra: 1 },
      })
    ).toThrow()
  })

  test("a screen missing its category or regex is refused", () => {
    expect(() =>
      BoundaryLensSchema.parse({
        ...VALID_BOUNDARY,
        head: { fallback: "x", screens: [{ regex: "^a", provenance: "p" }] },
      })
    ).toThrow()
  })

  test("boundaryLens is OPTIONAL on the catalog (opt-in) and parses when present", () => {
    expect(TallyCatalogSchema.parse(VALID).boundaryLens).toBeUndefined()
    const withLens = { ...VALID, boundaryLens: VALID_BOUNDARY }
    expect(TallyCatalogSchema.parse(withLens).boundaryLens?.runThreshold).toBe(3)
  })
})

describe("parseTallyCatalog", () => {
  test("null / undefined ⇒ null (the opt-in skip state)", () => {
    expect(parseTallyCatalog(null)).toBeNull()
    expect(parseTallyCatalog(undefined)).toBeNull()
  })

  test("a present but malformed value throws (fail loud)", () => {
    expect(() => parseTallyCatalog({ catalogVersion: "nope", patterns: [] })).toThrow()
  })

  test("a valid value parses to the catalog", () => {
    expect(parseTallyCatalog(VALID)?.catalogVersion).toBe(19)
  })
})
