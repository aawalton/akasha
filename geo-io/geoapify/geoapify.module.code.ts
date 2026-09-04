import { z } from "zod"
import type { GeoCoord } from "../coord/coord.module.code.ts"

export type GeoFetch = (
  url: string,
  init?: { headers?: Record<string, string> }
) => Promise<Response>

export const defaultGeoFetch: GeoFetch = (url, init) => fetch(url, init)

export const GEOAPIFY_AUTOCOMPLETE_URL = "https://api.geoapify.com/v1/geocode/autocomplete"
export const GEOAPIFY_GEOCODE_URL = "https://api.geoapify.com/v1/geocode/search"
export const GEOAPIFY_ROUTING_URL = "https://api.geoapify.com/v1/routing"

export const GEOAPIFY_GEOCODE_LIMIT = 1

export function buildGeoapifyAutocompleteUrl(text: string, apiKey: string, limit: number): string {
  const params = new URLSearchParams({ text, apiKey, limit: String(limit), format: "geojson" })
  return `${GEOAPIFY_AUTOCOMPLETE_URL}?${params.toString()}`
}

export function buildGeoapifyGeocodeUrl(
  text: string,
  apiKey: string,
  limit: number = GEOAPIFY_GEOCODE_LIMIT
): string {
  const params = new URLSearchParams({ text, apiKey, limit: String(limit), format: "geojson" })
  return `${GEOAPIFY_GEOCODE_URL}?${params.toString()}`
}

export function buildGeoapifyRoutingUrl(
  from: GeoCoord,
  to: GeoCoord,
  mode: string,
  apiKey: string
): string {
  const waypoints = `${from.lat},${from.lng}|${to.lat},${to.lng}`
  const params = new URLSearchParams({ waypoints, mode, apiKey, format: "geojson" })
  return `${GEOAPIFY_ROUTING_URL}?${params.toString()}`
}

export async function geoapifyFetchJson(
  url: string,
  fetchFn: GeoFetch = defaultGeoFetch
): Promise<unknown> {
  const res = await fetchFn(url)
  if (!res.ok) {
    throw new Error(`Geoapify request failed: HTTP ${res.status} ${res.statusText}`)
  }
  const body: unknown = await res.json()
  return body
}

const geocodeCollectionSchema = z
  .object({
    features: z.array(
      z
        .object({ properties: z.object({ lat: z.number(), lon: z.number() }).passthrough() })
        .passthrough()
    ),
  })
  .passthrough()

export async function geoapifyGeocode(
  text: string,
  apiKey: string,
  fetchFn: GeoFetch = defaultGeoFetch
): Promise<GeoCoord | null> {
  const raw = await geoapifyFetchJson(buildGeoapifyGeocodeUrl(text, apiKey), fetchFn)
  const first = geocodeCollectionSchema.parse(raw).features[0]
  if (first === undefined) return null
  return { lat: first.properties.lat, lng: first.properties.lon }
}

export interface RouteResult {
  readonly timeSeconds: number
  readonly distanceMeters: number
}

const routeCollectionSchema = z
  .object({
    features: z.array(
      z
        .object({ properties: z.object({ time: z.number(), distance: z.number() }).passthrough() })
        .passthrough()
    ),
  })
  .passthrough()

const geoapifyErrorEnvelopeSchema = z
  .object({ statusCode: z.number(), error: z.string(), message: z.string() })
  .passthrough()

export async function geoapifyRoute(
  from: GeoCoord,
  to: GeoCoord,
  mode: string,
  apiKey: string,
  fetchFn: GeoFetch = defaultGeoFetch
): Promise<RouteResult | null> {
  const raw = await geoapifyFetchJson(buildGeoapifyRoutingUrl(from, to, mode, apiKey), fetchFn)
  if (geoapifyErrorEnvelopeSchema.safeParse(raw).success) return null
  const first = routeCollectionSchema.parse(raw).features[0]
  if (first === undefined) return null
  return { timeSeconds: first.properties.time, distanceMeters: first.properties.distance }
}
