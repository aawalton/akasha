import { spotifyRequest } from "akasha/alan/music/spotify/modules/client/spotify-client.module.code.ts"
import type { Fetching } from "akasha/alan/music/spotify/modules/fetching/spotify-fetching.module.code.ts"
import { z } from "zod"

const MAX_PER_ADD = 100

const playlistSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    external_urls: z.object({ spotify: z.string() }).passthrough(),
  })
  .passthrough()

const snapshotSchema = z.object({ snapshot_id: z.string() }).passthrough()

export type Playlist = z.infer<typeof playlistSchema>

export type Making = {
  readonly name: string
  readonly description?: string
}

export function uriOf(trackId: string): string {
  return `spotify:track:${trackId}`
}

export function batchedInto(uris: readonly string[]): readonly (readonly string[])[] {
  const held: string[][] = []
  for (let at = 0; at < uris.length; at += MAX_PER_ADD) {
    held.push([...uris.slice(at, at + MAX_PER_ADD)])
  }
  return held
}

export function bodyFor(making: Making): Readonly<Record<string, unknown>> {
  return {
    name: making.name,
    public: false,
    ...(making.description === undefined ? {} : { description: making.description }),
  }
}

export function createPlaylist(making: Making, over?: Fetching): Promise<Playlist> {
  return spotifyRequest(
    "/me/playlists",
    playlistSchema,
    { method: "POST", body: bodyFor(making) },
    0,
    0,
    over
  )
}

export async function addTracks(
  playlistId: string,
  trackIds: readonly string[],
  over?: Fetching
): Promise<number> {
  let added = 0
  for (const batch of batchedInto(trackIds.map(uriOf))) {
    await spotifyRequest(
      `/playlists/${encodeURIComponent(playlistId)}/items`,
      snapshotSchema,
      { method: "POST", body: { uris: batch } },
      0,
      0,
      over
    )
    added += batch.length
  }
  return added
}
