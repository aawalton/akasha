import {
  spotifyRequest,
  withQuery,
} from "akasha/alan/music/spotify/modules/client/spotify-client.module.code.ts"
import type { Fetching } from "akasha/alan/music/spotify/modules/fetching/spotify-fetching.module.code.ts"
import { z } from "zod"

const MAX_PER_CALL = 100

const TRACK_URI_UNDER = "spotify:track:"

const heldItemSchema = z
  .object({ item: z.object({ uri: z.string().optional() }).passthrough().nullish() })
  .passthrough()

const heldSchema = z
  .object({
    items: z.array(heldItemSchema),
    total: z.number(),
    next: z.string().nullable(),
  })
  .passthrough()

type HeldItem = z.infer<typeof heldItemSchema>

const snapshotSchema = z.object({ snapshot_id: z.string() }).passthrough()

export function uriOf(trackId: string): string {
  return `spotify:track:${trackId}`
}

export function batchedInto(said: readonly string[]): readonly (readonly string[])[] {
  const held: string[][] = []
  for (let at = 0; at < said.length; at += MAX_PER_CALL) {
    held.push([...said.slice(at, at + MAX_PER_CALL)])
  }
  return held
}

export function itemsPath(playlistId: string, offset: number): string {
  return withQuery(`/playlists/${encodeURIComponent(playlistId)}/items`, {
    limit: MAX_PER_CALL,
    offset,
  })
}

function idOfUri(uri: unknown): string | null {
  if (typeof uri !== "string" || !uri.startsWith(TRACK_URI_UNDER)) return null
  const id = uri.slice(TRACK_URI_UNDER.length)
  return id.length === 0 ? null : id
}

export function idsHeldIn(items: readonly HeldItem[]): readonly string[] {
  const held: string[] = []
  for (const one of items) {
    const id = idOfUri(one.item?.uri)
    if (id !== null) held.push(id)
  }
  return held
}

export function removalBodyFor(trackIds: readonly string[]): Readonly<Record<string, unknown>> {
  return { items: trackIds.map((one) => ({ uri: uriOf(one) })) }
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

export async function putTracks(
  playlistId: string,
  trackIds: readonly string[],
  over?: Fetching
): Promise<number> {
  const at = `/playlists/${encodeURIComponent(playlistId)}/items`
  const batches = batchedInto(trackIds.map(uriOf))
  const first = batches[0] ?? []
  await spotifyRequest(at, snapshotSchema, { method: "PUT", body: { uris: first } }, 0, 0, over)
  let put = first.length
  for (const batch of batches.slice(1)) {
    await spotifyRequest(at, snapshotSchema, { method: "POST", body: { uris: batch } }, 0, 0, over)
    put += batch.length
  }
  return put
}

export async function removeTracks(
  playlistId: string,
  trackIds: readonly string[],
  over?: Fetching
): Promise<number> {
  let removed = 0
  for (const batch of batchedInto(trackIds)) {
    await spotifyRequest(
      `/playlists/${encodeURIComponent(playlistId)}/items`,
      snapshotSchema,
      { method: "DELETE", body: removalBodyFor(batch) },
      0,
      0,
      over
    )
    removed += batch.length
  }
  return removed
}

export async function heldTracks(playlistId: string, over?: Fetching): Promise<readonly string[]> {
  const held: string[] = []
  for (let offset = 0; ; offset += MAX_PER_CALL) {
    const page = await spotifyRequest(
      itemsPath(playlistId, offset),
      heldSchema,
      undefined,
      0,
      0,
      over
    )
    held.push(...idsHeldIn(page.items))
    if (page.next === null || page.items.length === 0) return held
  }
}
