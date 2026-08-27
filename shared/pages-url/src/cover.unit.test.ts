import { describe, expect, test } from "bun:test"
import { coverUrl, parseCoverPageId } from "./cover"
import { safeInternalPath } from "./index"

const ID = "0193abcd-ef01-7234-89ab-cdef01234567"

describe("coverUrl", () => {
  test("addresses a page's image at the path the image route serves", () => {
    expect(coverUrl(ID)).toBe("/api/image/0193abcd-ef01-7234-89ab-cdef01234567")
  })

  test("is an origin-relative internal path", () => {
    expect(safeInternalPath(coverUrl(ID))).toBe(coverUrl(ID))
  })
})

describe("parseCoverPageId", () => {
  test("recovers the page id a cover url was built from", () => {
    expect(parseCoverPageId(coverUrl(ID))).toBe(ID)
  })

  test("reads a cover url written by hand", () => {
    expect(parseCoverPageId("/api/image/0193abcd-ef01-7234-89ab-cdef01234567")).toBe(ID)
  })

  test("returns null for an absent cover", () => {
    expect(parseCoverPageId(null)).toBeNull()
    expect(parseCoverPageId(undefined)).toBeNull()
    expect(parseCoverPageId("")).toBeNull()
  })

  test("returns null for the bare prefix with no id after it", () => {
    expect(parseCoverPageId("/api/image/")).toBeNull()
  })

  test("returns null for a cover that is not an image-route url", () => {
    expect(parseCoverPageId(`/api/media/${ID}`)).toBeNull()
    expect(parseCoverPageId("https://example.com/api/image/x")).toBeNull()
    expect(parseCoverPageId("/persona/abby-01234567")).toBeNull()
  })
})
