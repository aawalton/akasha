import { describe, expect, test } from "bun:test"
import { addResponseSchema, placeCandidateSchema, searchResponseSchema } from "./place-candidate"

const valid = {
  sourcePlaceId: "geoapify-abc123",
  name: "Blue Bottle Coffee",
  address: "1 Main St, Oakland, CA",
  latitude: 37.8,
  longitude: -122.2,
  category: "catering.cafe",
}

describe("placeCandidateSchema", () => {
  test("accepts a full candidate", () => {
    expect(placeCandidateSchema.safeParse(valid).success).toBe(true)
  })

  test("accepts a candidate without the optional category", () => {
    const { category: _omit, ...rest } = valid
    expect(placeCandidateSchema.safeParse(rest).success).toBe(true)
  })

  test("rejects a missing required field", () => {
    const { sourcePlaceId: _omit, ...rest } = valid
    expect(placeCandidateSchema.safeParse(rest).success).toBe(false)
  })

  test("rejects a non-numeric coordinate", () => {
    expect(placeCandidateSchema.safeParse({ ...valid, latitude: "37.8" }).success).toBe(false)
  })

  test("rejects an unknown extra key (strict)", () => {
    expect(placeCandidateSchema.safeParse({ ...valid, injected: true }).success).toBe(false)
  })
})

describe("searchResponseSchema", () => {
  test("parses a candidate list", () => {
    expect(searchResponseSchema.safeParse({ candidates: [valid] }).success).toBe(true)
  })

  test("rejects an extra top-level key", () => {
    expect(searchResponseSchema.safeParse({ candidates: [], extra: 1 }).success).toBe(false)
  })
})

describe("addResponseSchema", () => {
  test("parses an id + href", () => {
    expect(
      addResponseSchema.safeParse({ id: "x", href: "/location/blue-bottle-abc12345" }).success
    ).toBe(true)
  })

  test("rejects empty id", () => {
    expect(addResponseSchema.safeParse({ id: "", href: "/x" }).success).toBe(false)
  })
})
