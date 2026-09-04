import { buildGeoapifyAutocompleteUrl } from "@akasha/geo-io/geoapify"
import { z } from "zod"
import type { PlaceCandidate } from "../../place-candidate/place-candidate.module.code.ts"

export const GEOAPIFY_SEARCH_LIMIT = 10

export function buildGeoapifySearchUrl(
  text: string,
  apiKey: string,
  limit: number = GEOAPIFY_SEARCH_LIMIT
): string {
  return buildGeoapifyAutocompleteUrl(text, apiKey, limit)
}

const geoapifyResponseSchema = z
  .object({
    features: z.array(
      z
        .object({
          properties: z
            .object({
              place_id: z.string().optional(),
              formatted: z.string().optional(),
              address_line1: z.string().optional(),
              name: z.string().optional(),
              lat: z.number().optional(),
              lon: z.number().optional(),
              category: z.string().optional(),
              result_type: z.string().optional(),
            })
            .passthrough(),
        })
        .passthrough()
    ),
  })
  .passthrough()

export type GeoapifyResponse = z.infer<typeof geoapifyResponseSchema>

export function normalizeFeatures(parsed: GeoapifyResponse): readonly PlaceCandidate[] {
  const candidates: PlaceCandidate[] = []
  for (const feature of parsed.features) {
    const p = feature.properties
    if (p.place_id == null || p.place_id === "") continue
    if (typeof p.lat !== "number" || typeof p.lon !== "number") continue
    const name = p.name ?? p.address_line1 ?? p.formatted
    if (name == null || name === "") continue
    const category = p.category ?? p.result_type
    candidates.push({
      sourcePlaceId: p.place_id,
      name,
      address: p.formatted ?? "",
      latitude: p.lat,
      longitude: p.lon,
      ...(category != null && category !== "" ? { category } : {}),
    })
  }
  return candidates
}

export async function searchPlaces(
  text: string,
  fetchFn: typeof fetch = fetch
): Promise<readonly PlaceCandidate[]> {
  const keyResult = z.string().min(1).safeParse(process.env.GEOAPIFY_API_KEY)
  if (!keyResult.success) {
    throw new Error("GEOAPIFY_API_KEY is not configured")
  }
  const url = buildGeoapifySearchUrl(text, keyResult.data)
  const res = await fetchFn(url)
  if (!res.ok) {
    throw new Error(`Geoapify request failed: HTTP ${res.status} ${res.statusText}`)
  }
  const raw: unknown = await res.json()
  const parsed = geoapifyResponseSchema.parse(raw)
  return normalizeFeatures(parsed)
}
