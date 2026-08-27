import { z } from "zod"
import { offsetPageSchema, spotifyGet } from "../client"
import type { EndpointDescriptor } from "./types"
import { attemptOrRecordRestriction } from "../restriction"

const ARTIST_BEATLES = "3WrFJ7ztbogyGnTHbHJFl2"
const ARTIST_RADIOHEAD = "4Z8W4fKeB5YxbusRsdQVPb"
const PROBE_MARKET = "US"

const imageSchema = z
  .object({
    url: z.string(),
    height: z.number().nullable(),
    width: z.number().nullable(),
  })
  .passthrough()

const externalUrlsSchema = z.object({ spotify: z.string() }).passthrough()

export const artistSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    uri: z.string(),
    href: z.string(),
    genres: z.array(z.string()).optional(),
    popularity: z.number().optional(),
    images: z.array(imageSchema).optional(),
    external_urls: externalUrlsSchema,
  })
  .passthrough()

export type SpotifyArtist = z.infer<typeof artistSchema>

export const severalArtistsSchema = z
  .object({ artists: z.array(artistSchema.nullable()) })
  .passthrough()

export const simplifiedAlbumSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    album_type: z.string(),
    album_group: z.string().optional(),
    total_tracks: z.number(),
    release_date: z.string(),
    uri: z.string(),
    external_urls: externalUrlsSchema,
  })
  .passthrough()

export const simplifiedTrackSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    duration_ms: z.number(),
    uri: z.string(),
    explicit: z.boolean(),
    external_urls: externalUrlsSchema,
  })
  .passthrough()

export const topTracksSchema = z.object({ tracks: z.array(simplifiedTrackSchema) }).passthrough()

export const artistAlbumsPageSchema = offsetPageSchema(simplifiedAlbumSchema)

export const relatedArtistsSchema = z.object({ artists: z.array(artistSchema) }).passthrough()

const descriptor: EndpointDescriptor = {
  name: "artists",
  scopes: [],
  probes: [
    {
      name: "GET /artists/{id}",
      run: () => spotifyGet(`/artists/${ARTIST_BEATLES}`, artistSchema),
    },
    {
      name: "GET /artists (several)",
      run: () =>
        attemptOrRecordRestriction(() =>
          spotifyGet(`/artists?ids=${ARTIST_BEATLES},${ARTIST_RADIOHEAD}`, severalArtistsSchema)
        ),
    },
    {
      name: "GET /artists/{id}/albums",
      run: () =>
        spotifyGet(
          `/artists/${ARTIST_BEATLES}/albums?include_groups=album&limit=10&market=${PROBE_MARKET}`,
          artistAlbumsPageSchema
        ),
    },
    {
      name: "GET /artists/{id}/top-tracks",
      run: () =>
        attemptOrRecordRestriction(() =>
          spotifyGet(
            `/artists/${ARTIST_BEATLES}/top-tracks?market=${PROBE_MARKET}`,
            topTracksSchema
          )
        ),
    },
    {
      name: "GET /artists/{id}/related-artists (restricted)",
      run: () =>
        attemptOrRecordRestriction(() =>
          spotifyGet(`/artists/${ARTIST_BEATLES}/related-artists`, relatedArtistsSchema)
        ),
    },
  ],
}

export default descriptor
