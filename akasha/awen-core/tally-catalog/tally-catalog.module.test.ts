import { describe, expect, test } from "bun:test"
import { parseTallyCatalog, TallyCatalogSchema } from "./tally-catalog.module.code.ts"

const pattern = (id: string) => ({
  id,
  family: "template" as const,
  regex: "\\bstay\\b",
  provenance: "a source",
})

describe("TallyCatalogSchema", () => {
  test("admits a catalog whose patterns each have their own id", () => {
    expect(
      TallyCatalogSchema.safeParse({ catalogVersion: 1, patterns: [pattern("a"), pattern("b")] })
        .success
    ).toBe(true)
  })

  test("two patterns may not share an id", () => {
    const read = TallyCatalogSchema.safeParse({
      catalogVersion: 1,
      patterns: [pattern("a"), pattern("a")],
    })
    expect(read.success).toBe(false)
    expect(read.error?.issues[0]?.message).toContain('duplicate pattern id "a"')
  })

  test("a family the code does not name is refused", () => {
    expect(
      TallyCatalogSchema.safeParse({
        catalogVersion: 1,
        patterns: [{ ...pattern("a"), family: "vibes" }],
      }).success
    ).toBe(false)
  })

  test("a key the schema does not name is refused", () => {
    expect(
      TallyCatalogSchema.safeParse({ catalogVersion: 1, patterns: [], extra: true }).success
    ).toBe(false)
  })
})

describe("parseTallyCatalog", () => {
  test("nothing given is nothing back", () => {
    expect(parseTallyCatalog(null)).toBe(null)
    expect(parseTallyCatalog(undefined)).toBe(null)
  })

  test("a sound catalog comes back parsed", () => {
    expect(parseTallyCatalog({ catalogVersion: 3, patterns: [] })?.catalogVersion).toBe(3)
  })

  test("an unsound catalog throws", () => {
    expect(() => parseTallyCatalog({ catalogVersion: -1, patterns: [] })).toThrow()
  })
})
