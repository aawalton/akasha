import { describe, expect, test } from "bun:test"
import { RESERVED_SLUGS_UNIVERSAL, validateSlugReserved } from "./reserved-slugs"

describe("validateSlugReserved", () => {
  for (const word of RESERVED_SLUGS_UNIVERSAL) {
    test(`rejects '${word}' as slug`, () => {
      expect(() => validateSlugReserved(word, "slug")).toThrow(`slug '${word}' is reserved`)
    })

    test(`rejects '${word}' as pluralSlug`, () => {
      expect(() => validateSlugReserved(word, "pluralSlug")).toThrow(
        `pluralSlug '${word}' is reserved`
      )
    })
  }

  test("accepts a non-reserved string", () => {
    expect(() => validateSlugReserved("widgets", "slug")).not.toThrow()
    expect(() => validateSlugReserved("widgets", "pluralSlug")).not.toThrow()
  })

  test("accepts undefined (only enforce when set)", () => {
    expect(() => validateSlugReserved(undefined, "slug")).not.toThrow()
    expect(() => validateSlugReserved(undefined, "pluralSlug")).not.toThrow()
  })

  test("accepts null (only enforce when set)", () => {
    expect(() => validateSlugReserved(null, "slug")).not.toThrow()
    expect(() => validateSlugReserved(null, "pluralSlug")).not.toThrow()
  })

  test("accepts non-string values (numbers, booleans, objects, arrays)", () => {
    expect(() => validateSlugReserved(42, "slug")).not.toThrow()
    expect(() => validateSlugReserved(true, "slug")).not.toThrow()
    expect(() => validateSlugReserved({ x: 1 }, "slug")).not.toThrow()
    expect(() => validateSlugReserved(["api"], "slug")).not.toThrow()
  })

  test("error message includes both the value and the fieldName", () => {
    try {
      validateSlugReserved("api", "slug")
      throw new Error("expected throw")
    } catch (err) {
      if (!(err instanceof Error)) throw err
      expect(err.message).toContain("api")
      expect(err.message).toContain("slug")
    }

    try {
      validateSlugReserved("auth", "pluralSlug")
      throw new Error("expected throw")
    } catch (err) {
      if (!(err instanceof Error)) throw err
      expect(err.message).toContain("auth")
      expect(err.message).toContain("pluralSlug")
    }
  })
})
