import { z } from "zod"
import { type OffsetPage, offsetPageSchema, spotifyGet, spotifyRequest } from "../client"
import type { EndpointDescriptor } from "./types"

export const categorySchema = z
  .object({
    id: z.string(),
    name: z.string(),
    href: z.string().optional(),
    icons: z
      .array(
        z
          .object({ url: z.string(), height: z.number().nullable(), width: z.number().nullable() })
          .passthrough()
      )
      .optional(),
  })
  .passthrough()

export type Category = z.infer<typeof categorySchema>

export const categoriesResponseSchema = z
  .object({ categories: offsetPageSchema(categorySchema) })
  .passthrough()

export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>

const albumItemSchema = z
  .object({ id: z.string(), name: z.string(), album_type: z.string().optional() })
  .passthrough()

export const newReleasesResponseSchema = z
  .object({ albums: offsetPageSchema(albumItemSchema) })
  .passthrough()

export type NewReleasesResponse = z.infer<typeof newReleasesResponseSchema>

export interface PageParams {
  readonly limit?: number
  readonly offset?: number
  readonly country?: string
}

function pageQuery(params: PageParams): string {
  const qs = new URLSearchParams()
  if (params.limit !== undefined) qs.set("limit", String(params.limit))
  if (params.offset !== undefined) qs.set("offset", String(params.offset))
  if (params.country !== undefined) qs.set("country", params.country)
  const s = qs.toString()
  return s === "" ? "" : `?${s}`
}

export function getCategories(params: PageParams = {}): Promise<CategoriesResponse> {
  return spotifyGet(`/browse/categories${pageQuery(params)}`, categoriesResponseSchema)
}

export function getAllCategories(): Promise<Category[]> {
  return paginateCategories(`/browse/categories?limit=50`)
}

async function paginateCategories(firstPath: string): Promise<Category[]> {
  const all: Category[] = []
  let next: string | null = firstPath
  while (next != null) {
    const page: CategoriesResponse = await spotifyGet(next, categoriesResponseSchema)
    const section: OffsetPage<Category> = page.categories
    all.push(...section.items)
    next = section.next
  }
  return all
}

export function getCategory(categoryId: string, params: PageParams = {}): Promise<Category> {
  return spotifyGet(
    `/browse/categories/${encodeURIComponent(categoryId)}${pageQuery(params)}`,
    categorySchema
  )
}

export function getNewReleases(params: PageParams = {}): Promise<NewReleasesResponse> {
  return spotifyGet(`/browse/new-releases${pageQuery(params)}`, newReleasesResponseSchema)
}

export type DeprecationOutcome =
  | { readonly outcome: "works"; readonly data: unknown }
  | { readonly outcome: "deprecated"; readonly status: number }

const DEPRECATED_STATUSES = new Set([403, 404])

export async function attemptDeprecated(path: string): Promise<DeprecationOutcome> {
  try {
    const data = await spotifyRequest(path, z.unknown())
    return { outcome: "works", data }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    for (const status of DEPRECATED_STATUSES) {
      if (message.includes(`spotify API ${status}`)) return { outcome: "deprecated", status }
    }
    throw err
  }
}

function recordingProbe(path: string): () => Promise<DeprecationOutcome> {
  return async () => {
    const result = await attemptDeprecated(path)
    const detail = result.outcome === "works" ? "works" : `deprecated (${result.status})`
    console.log(`   ↳ ${path} → ${detail}`)
    return result
  }
}

const TOPLISTS_CATEGORY_ID = "0JQ5DAqbMKFz6FAsUtgAab"

const descriptor: EndpointDescriptor = {
  name: "browse",
  scopes: [],
  probes: [
    { name: "GET /browse/categories", run: recordingProbe("/browse/categories?limit=10") },
    {
      name: "GET /browse/categories/{id} (toplists)",
      run: recordingProbe(`/browse/categories/${TOPLISTS_CATEGORY_ID}`),
    },
    { name: "GET /browse/new-releases", run: recordingProbe("/browse/new-releases?limit=10") },
    {
      name: "GET /browse/featured-playlists",
      run: recordingProbe("/browse/featured-playlists?limit=10"),
    },
    {
      name: "GET /browse/categories/{id}/playlists",
      run: recordingProbe(`/browse/categories/${TOPLISTS_CATEGORY_ID}/playlists?limit=10`),
    },
  ],
}

export default descriptor
