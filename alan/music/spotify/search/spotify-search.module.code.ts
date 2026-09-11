import {
  followPages,
  offsetPageSchema,
  type PageStep,
  spotifyGet,
} from "akasha/alan/music/spotify/client/spotify-client.module.code.ts"
import { z } from "zod"

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

export type SearchParams = {
  readonly q: string
  readonly types: readonly SearchType[]
  readonly limit?: number
  readonly offset?: number
  readonly market?: string
}

export function buildSearchPath(params: SearchParams): string {
  const asked = new URLSearchParams()
  asked.set("q", params.q)
  asked.set("type", params.types.join(","))
  if (params.limit !== undefined) asked.set("limit", String(params.limit))
  if (params.offset !== undefined) asked.set("offset", String(params.offset))
  if (params.market !== undefined) asked.set("market", params.market)
  return `/search?${asked.toString()}`
}

export function search(params: SearchParams): Promise<SearchResponse> {
  return spotifyGet(buildSearchPath(params), searchResponseSchema)
}

export type SearchPaginateOptions = {
  readonly market?: string
  readonly limit?: number
  readonly max?: number
}

export function searchPaginate(
  q: string,
  type: SearchType,
  options: SearchPaginateOptions = {}
): Promise<SearchItem[]> {
  const sectionKey = SECTION_KEY[type]
  const firstPath = buildSearchPath({
    q,
    types: [type],
    limit: options.limit,
    market: options.market,
  })
  return followPages<SearchItem>(
    firstPath,
    async (path) => {
      const page: SearchResponse = await spotifyGet(path, searchResponseSchema)
      const section = page[sectionKey]
      if (section == null) return null
      const items: SearchItem[] = []
      for (const item of section.items) {
        if (item != null) items.push(item)
      }
      const step: PageStep<SearchItem> = { items, next: section.next }
      return step
    },
    options
  )
}
