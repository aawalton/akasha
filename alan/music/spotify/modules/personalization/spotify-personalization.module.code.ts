import {
  paginateOffset,
  withQuery,
} from "akasha/alan/music/spotify/modules/client/spotify-client.module.code.ts"
import type { Fetching } from "akasha/alan/music/spotify/modules/fetching/spotify-fetching.module.code.ts"
import { z } from "zod"

export const TIME_RANGES = ["short_term", "medium_term", "long_term"] as const

export type TimeRange = (typeof TIME_RANGES)[number]

const PAGE_LIMIT = 50

const topArtistSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.literal("artist").optional(),
    genres: z.array(z.string()).optional(),
    popularity: z.number().optional(),
    uri: z.string().optional(),
    external_urls: z.object({ spotify: z.string() }).passthrough().optional(),
  })
  .passthrough()

type TopArtist = z.infer<typeof topArtistSchema>

const topTrackSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.literal("track").optional(),
    popularity: z.number().optional(),
    uri: z.string().optional(),
    artists: z.array(z.object({ id: z.string(), name: z.string() }).passthrough()).optional(),
    album: z.object({ id: z.string(), name: z.string() }).passthrough().optional(),
    external_urls: z.object({ spotify: z.string() }).passthrough().optional(),
  })
  .passthrough()

type TopTrack = z.infer<typeof topTrackSchema>

export function topItemsPath(entity: "artists" | "tracks", timeRange: TimeRange): string {
  return withQuery(`/me/top/${entity}`, { time_range: timeRange, limit: PAGE_LIMIT })
}

export function getTopArtists(timeRange: TimeRange, over?: Fetching): Promise<TopArtist[]> {
  return paginateOffset(
    topItemsPath("artists", timeRange),
    topArtistSchema,
    { max: PAGE_LIMIT },
    over
  )
}

export function getTopTracks(timeRange: TimeRange, over?: Fetching): Promise<TopTrack[]> {
  return paginateOffset(
    topItemsPath("tracks", timeRange),
    topTrackSchema,
    { max: PAGE_LIMIT },
    over
  )
}
