import { describe, expect, test } from "bun:test"
import {
  buildGeoapifyAutocompleteUrl,
  buildGeoapifyGeocodeUrl,
  buildGeoapifyRoutingUrl,
  type GeoFetch,
  geoapifyFetchJson,
  geoapifyGeocode,
  geoapifyRoute,
} from "./geoapify"

const jsonResponse =
  (body: unknown): GeoFetch =>
  async () =>
    new Response(JSON.stringify(body), { status: 200 })

describe("buildGeoapifyAutocompleteUrl", () => {
  test("carries text, apiKey, limit, geojson format", () => {
    const url = new URL(buildGeoapifyAutocompleteUrl("Denver", "K", 10))
    expect(url.searchParams.get("text")).toBe("Denver")
    expect(url.searchParams.get("apiKey")).toBe("K")
    expect(url.searchParams.get("limit")).toBe("10")
    expect(url.searchParams.get("format")).toBe("geojson")
  })
})

describe("buildGeoapifyGeocodeUrl", () => {
  test("defaults limit to 1", () => {
    const url = new URL(buildGeoapifyGeocodeUrl("Denver", "K"))
    expect(url.searchParams.get("limit")).toBe("1")
    expect(url.pathname).toContain("/geocode/search")
  })
})

describe("buildGeoapifyRoutingUrl", () => {
  test("encodes waypoints as fromLat,fromLng|toLat,toLng and the mode", () => {
    const url = new URL(
      buildGeoapifyRoutingUrl({ lat: 1, lng: 2 }, { lat: 3, lng: 4 }, "drive", "K")
    )
    expect(url.searchParams.get("waypoints")).toBe("1,2|3,4")
    expect(url.searchParams.get("mode")).toBe("drive")
    expect(url.searchParams.get("apiKey")).toBe("K")
    expect(url.searchParams.get("format")).toBe("geojson")
  })
})

describe("geoapifyFetchJson", () => {
  test("returns the parsed body on 2xx", async () => {
    const body = { hello: "world" }
    expect(await geoapifyFetchJson("https://x", jsonResponse(body))).toEqual(body)
  })

  test("throws on a non-2xx response", async () => {
    const stub: GeoFetch = async () => new Response("", { status: 500, statusText: "Server Error" })
    await expect(geoapifyFetchJson("https://x", stub)).rejects.toThrow(
      /Geoapify request failed: HTTP 500/
    )
  })
})

describe("geoapifyGeocode", () => {
  test("returns the first feature's coordinates", async () => {
    const stub = jsonResponse({ features: [{ properties: { lat: 39.7, lon: -104.9 } }] })
    expect(await geoapifyGeocode("Denver", "K", stub)).toEqual({ lat: 39.7, lng: -104.9 })
  })

  test("returns null when there are no features", async () => {
    expect(await geoapifyGeocode("nowhere", "K", jsonResponse({ features: [] }))).toBeNull()
  })
})

describe("geoapifyRoute", () => {
  test("returns time (seconds) and distance (meters) from the first feature", async () => {
    const stub = jsonResponse({ features: [{ properties: { time: 1380, distance: 29612 } }] })
    expect(await geoapifyRoute({ lat: 1, lng: 2 }, { lat: 3, lng: 4 }, "drive", "K", stub)).toEqual(
      {
        timeSeconds: 1380,
        distanceMeters: 29612,
      }
    )
  })

  test("returns null when the API returns no route", async () => {
    const stub = jsonResponse({ features: [] })
    expect(
      await geoapifyRoute({ lat: 1, lng: 2 }, { lat: 3, lng: 4 }, "drive", "K", stub)
    ).toBeNull()
  })

  test("returns null on the 200-status error envelope (unsnappable waypoint)", async () => {
    const stub = jsonResponse({
      statusCode: 400,
      error: "Bad Request",
      message: "No path could be found for input",
    })
    expect(
      await geoapifyRoute({ lat: 1, lng: 2 }, { lat: 3, lng: 4 }, "drive", "K", stub)
    ).toBeNull()
  })
})
