import { spotifyGet } from "akasha/alan/music/spotify/client/spotify-client.module.code.ts"
import { z } from "zod"

const trackArtistRefSchema = z.object({ name: z.string() }).passthrough()

export const trackSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    duration_ms: z.number(),
    explicit: z.boolean(),
    external_urls: z.object({ spotify: z.string() }).passthrough(),
    artists: z.array(trackArtistRefSchema),
  })
  .passthrough()

export type Track = z.infer<typeof trackSchema>

export function getTrack(id: string): Promise<Track> {
  return spotifyGet(`/tracks/${id}`, trackSchema)
}
