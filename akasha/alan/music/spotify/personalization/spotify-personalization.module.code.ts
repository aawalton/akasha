import { z } from "zod"
import { paginateOffset } from "../client/spotify-client.module.code.ts"

export const TIME_RANGES = ["short_term", "medium_term", "long_term"] as const

export type TimeRange = (typeof TIME_RANGES)[number]

const PAGE_LIMIT = 50

export const topArtistSchema = z
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

export type TopArtist = z.infer<typeof topArtistSchema>

export const topTrackSchema = z
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

export type TopTrack = z.infer<typeof topTrackSchema>

export function topItemsPath(entity: "artists" | "tracks", timeRange: TimeRange): string {
  return `/me/top/${entity}?time_range=${timeRange}&limit=${PAGE_LIMIT}`
}

export function getTopArtists(timeRange: TimeRange): Promise<TopArtist[]> {
  return paginateOffset(topItemsPath("artists", timeRange), topArtistSchema, { max: PAGE_LIMIT })
}

export function getTopTracks(timeRange: TimeRange): Promise<TopTrack[]> {
  return paginateOffset(topItemsPath("tracks", timeRange), topTrackSchema, { max: PAGE_LIMIT })
}
