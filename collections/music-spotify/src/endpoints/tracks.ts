import { z } from "zod"
import { spotifyGet } from "../client"
import type { EndpointDescriptor } from "./types"

const SAMPLE_TRACK_ID = "11dFghVXANMlKmJXsNCbNl"
const SAMPLE_TRACK_IDS: readonly string[] = ["11dFghVXANMlKmJXsNCbNl", "7ouMYWpwJ422jRcDASZB7P"]

export const trackArtistRefSchema = z.object({ name: z.string() }).passthrough()

export const trackSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    duration_ms: z.number(),
    explicit: z.boolean(),
    external_urls: z.object({ spotify: z.string() }).passthrough(),
    artists: z.array(trackArtistRefSchema).optional(),
  })
  .passthrough()

export type Track = z.infer<typeof trackSchema>

export function getTrack(id: string): Promise<Track> {
  return spotifyGet(`/tracks/${id}`, trackSchema)
}

export const severalTracksSchema = z
  .object({ tracks: z.array(trackSchema.nullable()) })
  .passthrough()

export const audioFeaturesSchema = z
  .object({
    id: z.string(),
    danceability: z.number(),
    energy: z.number(),
    tempo: z.number(),
    valence: z.number(),
  })
  .passthrough()

export const severalAudioFeaturesSchema = z
  .object({ audio_features: z.array(audioFeaturesSchema.nullable()) })
  .passthrough()

export const audioAnalysisSchema = z
  .object({ track: z.object({ duration: z.number() }).passthrough() })
  .passthrough()

export type Reachability =
  | { readonly reachable: true; readonly data: unknown }
  | { readonly reachable: false; readonly status: 403; readonly reason: string }

function isForbidden(err: unknown): boolean {
  return err instanceof Error && /\bspotify API 403\b/.test(err.message)
}

export async function recordReachability(
  reason: string,
  call: () => Promise<unknown>
): Promise<Reachability> {
  try {
    return { reachable: true, data: await call() }
  } catch (err) {
    if (isForbidden(err)) {
      return { reachable: false, status: 403, reason }
    }
    throw err
  }
}

const DEPRECATED_REASON = "deprecated for new apps (403)"
const RESTRICTED_REASON = "bulk endpoint restricted for this app (403)"

const descriptor: EndpointDescriptor = {
  name: "tracks",
  scopes: [],
  probes: [
    {
      name: "GET /tracks/{id}",
      run: () => spotifyGet(`/tracks/${SAMPLE_TRACK_ID}`, trackSchema),
    },
    {
      name: "GET /tracks (several — attempt + record)",
      run: () =>
        recordReachability(RESTRICTED_REASON, () =>
          spotifyGet(`/tracks?ids=${SAMPLE_TRACK_IDS.join(",")}`, severalTracksSchema)
        ),
    },
    {
      name: "GET /audio-features/{id} (deprecated — attempt + record)",
      run: () =>
        recordReachability(DEPRECATED_REASON, () =>
          spotifyGet(`/audio-features/${SAMPLE_TRACK_ID}`, audioFeaturesSchema)
        ),
    },
    {
      name: "GET /audio-features (several, deprecated — attempt + record)",
      run: () =>
        recordReachability(DEPRECATED_REASON, () =>
          spotifyGet(
            `/audio-features?ids=${SAMPLE_TRACK_IDS.join(",")}`,
            severalAudioFeaturesSchema
          )
        ),
    },
    {
      name: "GET /audio-analysis/{id} (deprecated — attempt + record)",
      run: () =>
        recordReachability(DEPRECATED_REASON, () =>
          spotifyGet(`/audio-analysis/${SAMPLE_TRACK_ID}`, audioAnalysisSchema)
        ),
    },
  ],
}

export default descriptor
