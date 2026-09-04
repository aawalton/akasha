import { z } from "zod"
import { spotifyGet } from "../client/spotify-client.module.code.ts"

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
