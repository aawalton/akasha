import {
  offsetPageSchema,
  spotifyGet,
  withQuery,
} from "akasha/alan/music/spotify/modules/client/spotify-client.module.code.ts"
import type { Fetching } from "akasha/alan/music/spotify/modules/fetching/spotify-fetching.module.code.ts"
import { z } from "zod"

const SEARCH_TYPES = [
  "album",
  "artist",
  "playlist",
  "track",
  "show",
  "episode",
  "audiobook",
] as const

type SearchType = (typeof SEARCH_TYPES)[number]

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

export type SearchParams = {
  readonly q: string
  readonly types: readonly SearchType[]
  readonly limit?: number
  readonly offset?: number
  readonly market?: string
}

export function buildSearchPath(params: SearchParams): string {
  return withQuery("/search", {
    q: params.q,
    type: params.types.join(","),
    limit: params.limit,
    offset: params.offset,
    market: params.market,
  })
}

export function search(params: SearchParams, over?: Fetching): Promise<SearchResponse> {
  return spotifyGet(buildSearchPath(params), searchResponseSchema, over)
}
