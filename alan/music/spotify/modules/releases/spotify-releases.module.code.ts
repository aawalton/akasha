import {
  offsetPageSchema,
  paginateOffset,
  spotifyGet,
  withQuery,
} from "akasha/alan/music/spotify/modules/client/spotify-client.module.code.ts"
import type { Fetching } from "akasha/alan/music/spotify/modules/fetching/spotify-fetching.module.code.ts"
import { z } from "zod"

const PAGE_LIMIT = 10

const GROUPS = "album,single,compilation"

const MS_A_MINUTE = 60_000

const trackArtistRefSchema = z.object({ id: z.string(), name: z.string() }).passthrough()

export const albumSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    album_type: z.string(),
    release_date: z.string(),
    release_date_precision: z.string(),
    total_tracks: z.number(),
    external_urls: z.object({ spotify: z.string() }).passthrough(),
  })
  .passthrough()

export type Album = z.infer<typeof albumSchema>

const albumTrackSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    duration_ms: z.number(),
    track_number: z.number(),
    disc_number: z.number(),
    explicit: z.boolean(),
    artists: z.array(trackArtistRefSchema),
    external_urls: z.object({ spotify: z.string() }).passthrough(),
  })
  .passthrough()

export type AlbumTrack = z.infer<typeof albumTrackSchema>

export const albumWithTracksSchema = albumSchema.extend({
  tracks: z.object({ items: z.array(albumTrackSchema) }).passthrough(),
})

export type AlbumWithTracks = z.infer<typeof albumWithTracksSchema>

const albumAnswerSchema = albumSchema.extend({ tracks: offsetPageSchema(albumTrackSchema) })

export function artistAlbumsPath(artistId: string): string {
  return withQuery(`/artists/${artistId}/albums`, {
    include_groups: GROUPS,
    limit: PAGE_LIMIT,
  })
}

export function getArtistAlbums(artistId: string, over?: Fetching): Promise<Album[]> {
  return paginateOffset(artistAlbumsPath(artistId), albumSchema, undefined, over)
}

export async function getAlbum(albumId: string, over?: Fetching): Promise<AlbumWithTracks> {
  const answer = await spotifyGet(`/albums/${albumId}`, albumAnswerSchema, over)
  const rest =
    answer.tracks.next === null
      ? []
      : await paginateOffset(answer.tracks.next, albumTrackSchema, undefined, over)
  return { ...answer, tracks: { items: [...answer.tracks.items, ...rest] } }
}

export function albumMinutes(album: AlbumWithTracks): number {
  return album.tracks.items.reduce((was, one) => was + one.duration_ms, 0) / MS_A_MINUTE
}

export function trackMinutes(track: AlbumTrack): number {
  return track.duration_ms / MS_A_MINUTE
}
