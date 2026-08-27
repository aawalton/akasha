import { z } from "zod"
import { offsetPageSchema, spotifyGet } from "../client"
import type { EndpointDescriptor } from "./types"

export const SEARCH_TYPES = [
  "album",
  "artist",
  "playlist",
  "track",
  "show",
  "episode",
  "audiobook",
] as const

export type SearchType = (typeof SEARCH_TYPES)[number]

const itemSchema = z
  .object({
    id: z.string().nullable(),
    name: z.string(),
    type: z.string().optional(),
    uri: z.string().optional(),
  })
  .passthrough()

const nullableItemSchema = itemSchema.nullable()

export const searchResponseSchema = z
  .object({
    tracks: offsetPageSchema(itemSchema).optional(),
    artists: offsetPageSchema(itemSchema).optional(),
    albums: offsetPageSchema(itemSchema).optional(),
    playlists: offsetPageSchema(nullableItemSchema).optional(),
    shows: offsetPageSchema(nullableItemSchema).optional(),
    episodes: offsetPageSchema(nullableItemSchema).optional(),
    audiobooks: offsetPageSchema(nullableItemSchema).optional(),
  })
  .passthrough()

export type SearchResponse = z.infer<typeof searchResponseSchema>
export type SearchItem = z.infer<typeof itemSchema>

const SECTION_KEY = {
  album: "albums",
  artist: "artists",
  playlist: "playlists",
  track: "tracks",
  show: "shows",
  episode: "episodes",
  audiobook: "audiobooks",
} as const satisfies Record<SearchType, keyof SearchResponse>

export interface SearchParams {
  readonly q: string
  readonly types: readonly SearchType[]
  readonly limit?: number
  readonly offset?: number
  readonly market?: string
}

export function buildSearchPath(params: SearchParams): string {
  const qs = new URLSearchParams()
  qs.set("q", params.q)
  qs.set("type", params.types.join(","))
  if (params.limit !== undefined) qs.set("limit", String(params.limit))
  if (params.offset !== undefined) qs.set("offset", String(params.offset))
  if (params.market !== undefined) qs.set("market", params.market)
  return `/search?${qs.toString()}`
}

export function search(params: SearchParams): Promise<SearchResponse> {
  return spotifyGet(buildSearchPath(params), searchResponseSchema)
}

export interface SearchPaginateOptions {
  readonly market?: string
  readonly limit?: number
  readonly max?: number
}

export async function searchPaginate(
  q: string,
  type: SearchType,
  options: SearchPaginateOptions = {}
): Promise<SearchItem[]> {
  const sectionKey = SECTION_KEY[type]
  const items: SearchItem[] = []
  let next: string | null = buildSearchPath({
    q,
    types: [type],
    limit: options.limit,
    market: options.market,
  })
  while (next != null) {
    const page: SearchResponse = await spotifyGet(next, searchResponseSchema)
    const section = page[sectionKey]
    if (section == null) break
    for (const item of section.items) {
      if (item != null) items.push(item)
    }
    if (options.max !== undefined && items.length >= options.max) break
    next = section.next
  }
  return items
}

const descriptor: EndpointDescriptor = {
  name: "search",
  scopes: [],
  probes: [
    {
      name: "GET /search (multi-type)",
      run: () =>
        search({
          q: "daft punk",
          types: ["album", "artist", "playlist", "track", "show", "episode", "audiobook"],
          limit: 3,
        }),
    },
    {
      name: "GET /search (track, single type)",
      run: () => search({ q: "one more time", types: ["track"], limit: 5 }),
    },
    {
      name: "GET /search (paginate artists, max 25)",
      run: () => searchPaginate("rock", "artist", { limit: 10, max: 25 }),
    },
  ],
}

export default descriptor
