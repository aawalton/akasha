import {
  paginateOffset,
  spotifyGet,
  withQuery,
} from "akasha/alan/music/spotify/modules/client/spotify-client.module.code.ts"
import { z } from "zod"

const PAGE_LIMIT = 10

const GROUPS = "album,single,compilation"

const MS_A_MINUTE = 60_000

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
  .object({ id: z.string(), name: z.string(), duration_ms: z.number() })
  .passthrough()

export const albumWithTracksSchema = albumSchema.extend({
  tracks: z.object({ items: z.array(albumTrackSchema) }).passthrough(),
})

export type AlbumWithTracks = z.infer<typeof albumWithTracksSchema>

export function artistAlbumsPath(artistId: string): string {
  return withQuery(`/artists/${artistId}/albums`, {
    include_groups: GROUPS,
    limit: PAGE_LIMIT,
  })
}

export function getArtistAlbums(artistId: string): Promise<Album[]> {
  return paginateOffset(artistAlbumsPath(artistId), albumSchema)
}

export function getAlbum(albumId: string): Promise<AlbumWithTracks> {
  return spotifyGet(`/albums/${albumId}`, albumWithTracksSchema)
}

export function albumMinutes(album: AlbumWithTracks): number {
  return album.tracks.items.reduce((was, one) => was + one.duration_ms, 0) / MS_A_MINUTE
}
