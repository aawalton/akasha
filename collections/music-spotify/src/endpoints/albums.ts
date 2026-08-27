import { z } from "zod"
import { offsetPageSchema, spotifyGet } from "../client"
import type { EndpointDescriptor } from "./types"
import { attemptOrRecordRestriction } from "../restriction"

const ALBUM_ABBEY_ROAD = "0ETFjACtuP2ADo6LFhL6HN"
const ALBUM_DARK_SIDE = "4LH4d3cOWNNsVw41Gqt2kv"
const PROBE_MARKET = "US"

const imageSchema = z
  .object({
    url: z.string(),
    height: z.number().nullable(),
    width: z.number().nullable(),
  })
  .passthrough()

const externalUrlsSchema = z.object({ spotify: z.string() }).passthrough()

const artistRefSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    uri: z.string(),
    external_urls: externalUrlsSchema,
  })
  .passthrough()

export const simplifiedTrackSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    track_number: z.number(),
    duration_ms: z.number(),
    uri: z.string(),
    explicit: z.boolean(),
    artists: z.array(artistRefSchema),
    external_urls: externalUrlsSchema,
  })
  .passthrough()

export const albumTracksPageSchema = offsetPageSchema(simplifiedTrackSchema)

export const albumSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    album_type: z.string(),
    total_tracks: z.number(),
    release_date: z.string(),
    uri: z.string(),
    href: z.string(),
    label: z.string().optional(),
    popularity: z.number().optional(),
    images: z.array(imageSchema).optional(),
    artists: z.array(artistRefSchema),
    external_urls: externalUrlsSchema,
    tracks: albumTracksPageSchema.optional(),
  })
  .passthrough()

export type SpotifyAlbum = z.infer<typeof albumSchema>

export const severalAlbumsSchema = z
  .object({ albums: z.array(albumSchema.nullable()) })
  .passthrough()

const descriptor: EndpointDescriptor = {
  name: "albums",
  scopes: [],
  probes: [
    {
      name: "GET /albums/{id}",
      run: () => spotifyGet(`/albums/${ALBUM_ABBEY_ROAD}?market=${PROBE_MARKET}`, albumSchema),
    },
    {
      name: "GET /albums (several)",
      run: () =>
        attemptOrRecordRestriction(() =>
          spotifyGet(
            `/albums?ids=${ALBUM_ABBEY_ROAD},${ALBUM_DARK_SIDE}&market=${PROBE_MARKET}`,
            severalAlbumsSchema
          )
        ),
    },
    {
      name: "GET /albums/{id}/tracks",
      run: () =>
        spotifyGet(
          `/albums/${ALBUM_ABBEY_ROAD}/tracks?limit=10&market=${PROBE_MARKET}`,
          albumTracksPageSchema
        ),
    },
  ],
}

export default descriptor
