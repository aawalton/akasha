import { describe, expect, test } from "bun:test"
import { GEOAPIFY_AUTOCOMPLETE_URL } from "@shared/geo-io/geoapify"
import { buildGeoapifySearchUrl, normalizeFeatures } from "./geoapify.server"

describe("buildGeoapifySearchUrl", () => {
  test("includes url-encoded text, key, default limit, and geojson format", () => {
    const url = buildGeoapifySearchUrl("Joe's Cafe & Bar", "KEY123")
    expect(url.startsWith(`${GEOAPIFY_AUTOCOMPLETE_URL}?`)).toBe(true)
    const params = new URL(url).searchParams
    expect(params.get("text")).toBe("Joe's Cafe & Bar")
    expect(params.get("apiKey")).toBe("KEY123")
    expect(params.get("limit")).toBe("10")
    expect(params.get("format")).toBe("geojson")
  })

  test("honors a custom limit", () => {
    const params = new URL(buildGeoapifySearchUrl("paris", "K", 3)).searchParams
    expect(params.get("limit")).toBe("3")
  })
})

describe("normalizeFeatures", () => {
  const candidates = normalizeFeatures({
    features: [
      {
        properties: {
          place_id: "p1",
          name: "Blue Bottle",
          formatted: "1 Main St, Oakland",
          lat: 37.8,
          lon: -122.2,
          category: "catering.cafe",
        },
      },
      {
        properties: {
          place_id: "p2",
          address_line1: "500 Market St",
          formatted: "500 Market St, SF",
          lat: 37.79,
          lon: -122.4,
          result_type: "building",
        },
      },
      { properties: { place_id: "p3", formatted: "Nowhere", lat: 1 } },
      { properties: { name: "No id", formatted: "x", lat: 1, lon: 2 } },
    ],
  })

  test("keeps only the well-formed features", () => {
    expect(candidates.map((c) => c.sourcePlaceId)).toEqual(["p1", "p2"])
  })

  test("maps fields and prefers name over address_line1, category over result_type", () => {
    expect(candidates[0]).toEqual({
      sourcePlaceId: "p1",
      name: "Blue Bottle",
      address: "1 Main St, Oakland",
      latitude: 37.8,
      longitude: -122.2,
      category: "catering.cafe",
    })
    expect(candidates[1]).toEqual({
      sourcePlaceId: "p2",
      name: "500 Market St",
      address: "500 Market St, SF",
      latitude: 37.79,
      longitude: -122.4,
      category: "building",
    })
  })

  test("omits category when neither category nor result_type is present", () => {
    const [only] = normalizeFeatures({
      features: [{ properties: { place_id: "p9", name: "Plain", lat: 1, lon: 2 } }],
    })
    expect(only).toEqual({
      sourcePlaceId: "p9",
      name: "Plain",
      address: "",
      latitude: 1,
      longitude: 2,
    })
  })
})
