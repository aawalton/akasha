import { z } from "zod"
import {
  type OffsetPage,
  offsetPageSchema,
  paginateOffset,
  spotifyGet,
  spotifyRequest,
} from "../client"
import type { EndpointDescriptor } from "./types"

const ownerSchema = z.object({ id: z.string() }).passthrough()

export const playlistSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    owner: ownerSchema.optional(),
    public: z.boolean().nullable().optional(),
    collaborative: z.boolean().optional(),
    description: z.string().nullable().optional(),
    snapshot_id: z.string().optional(),
  })
  .passthrough()

export const playlistTrackSchema = z
  .object({
    track: z
      .object({
        id: z.string().nullable(),
        name: z.string(),
        uri: z.string().optional(),
      })
      .passthrough()
      .nullable(),
  })
  .passthrough()

const listItemSchema = playlistSchema.nullable()

export const snapshotSchema = z.object({ snapshot_id: z.string() }).passthrough()

export const emptyResponseSchema = z.null()

export type Playlist = z.infer<typeof playlistSchema>
export type PlaylistTrack = z.infer<typeof playlistTrackSchema>
export type Snapshot = z.infer<typeof snapshotSchema>

export interface PageParams {
  readonly limit?: number
  readonly offset?: number
  readonly market?: string
  readonly fields?: string
}

function pageQuery(p?: PageParams): string {
  const qs = new URLSearchParams()
  if (p?.limit !== undefined) qs.set("limit", String(p.limit))
  if (p?.offset !== undefined) qs.set("offset", String(p.offset))
  if (p?.market !== undefined) qs.set("market", p.market)
  if (p?.fields !== undefined) qs.set("fields", p.fields)
  const s = qs.toString()
  return s.length > 0 ? `?${s}` : ""
}

export function getPlaylist(
  id: string,
  opts?: Pick<PageParams, "market" | "fields">
): Promise<Playlist> {
  return spotifyGet(`/playlists/${id}${pageQuery(opts)}`, playlistSchema)
}

export function getPlaylistTracks(id: string, p?: PageParams): Promise<OffsetPage<PlaylistTrack>> {
  return spotifyGet(`/playlists/${id}/tracks${pageQuery(p)}`, offsetPageSchema(playlistTrackSchema))
}

export function getPlaylistTracksAll(
  id: string,
  opts?: Pick<PageParams, "market">
): Promise<PlaylistTrack[]> {
  return paginateOffset(`/playlists/${id}/tracks${pageQuery(opts)}`, playlistTrackSchema)
}

export function getMyPlaylists(p?: PageParams): Promise<OffsetPage<Playlist | null>> {
  return spotifyGet(`/me/playlists${pageQuery(p)}`, offsetPageSchema(listItemSchema))
}

export function getMyPlaylistsAll(): Promise<(Playlist | null)[]> {
  return paginateOffset("/me/playlists", listItemSchema)
}

export function getUserPlaylists(
  userId: string,
  p?: PageParams
): Promise<OffsetPage<Playlist | null>> {
  return spotifyGet(`/users/${userId}/playlists${pageQuery(p)}`, offsetPageSchema(listItemSchema))
}

export function getUserPlaylistsAll(userId: string): Promise<(Playlist | null)[]> {
  return paginateOffset(`/users/${userId}/playlists`, listItemSchema)
}

export interface CreatePlaylistBody {
  readonly name: string
  readonly isPublic?: boolean
  readonly collaborative?: boolean
  readonly description?: string
}

export function createPlaylist(userId: string, body: CreatePlaylistBody): Promise<Playlist> {
  return spotifyRequest(`/users/${userId}/playlists`, playlistSchema, {
    method: "POST",
    body: {
      name: body.name,
      ...(body.isPublic !== undefined && { public: body.isPublic }),
      ...(body.collaborative !== undefined && { collaborative: body.collaborative }),
      ...(body.description !== undefined && { description: body.description }),
    },
  })
}

export interface ChangeDetailsBody {
  readonly name?: string
  readonly isPublic?: boolean
  readonly collaborative?: boolean
  readonly description?: string
}

export function changePlaylistDetails(id: string, body: ChangeDetailsBody): Promise<null> {
  return spotifyRequest(`/playlists/${id}`, emptyResponseSchema, {
    method: "PUT",
    body: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.isPublic !== undefined && { public: body.isPublic }),
      ...(body.collaborative !== undefined && { collaborative: body.collaborative }),
      ...(body.description !== undefined && { description: body.description }),
    },
  })
}

export interface AddTracksBody {
  readonly uris: readonly string[]
  readonly position?: number
}

export function addTracks(id: string, body: AddTracksBody): Promise<Snapshot> {
  return spotifyRequest(`/playlists/${id}/tracks`, snapshotSchema, {
    method: "POST",
    body: {
      uris: [...body.uris],
      ...(body.position !== undefined && { position: body.position }),
    },
  })
}

export interface RemoveTracksBody {
  readonly tracks: readonly { readonly uri: string }[]
  readonly snapshotId?: string
}

export function removeTracks(id: string, body: RemoveTracksBody): Promise<Snapshot> {
  return spotifyRequest(`/playlists/${id}/tracks`, snapshotSchema, {
    method: "DELETE",
    body: {
      tracks: body.tracks.map((t) => ({ uri: t.uri })),
      ...(body.snapshotId !== undefined && { snapshot_id: body.snapshotId }),
    },
  })
}

export interface ReorderBody {
  readonly rangeStart: number
  readonly insertBefore: number
  readonly rangeLength?: number
  readonly snapshotId?: string
}

export function reorderTracks(id: string, body: ReorderBody): Promise<Snapshot> {
  return spotifyRequest(`/playlists/${id}/tracks`, snapshotSchema, {
    method: "PUT",
    body: {
      range_start: body.rangeStart,
      insert_before: body.insertBefore,
      ...(body.rangeLength !== undefined && { range_length: body.rangeLength }),
      ...(body.snapshotId !== undefined && { snapshot_id: body.snapshotId }),
    },
  })
}

export function replaceTracks(id: string, uris: readonly string[]): Promise<Snapshot> {
  return spotifyRequest(`/playlists/${id}/tracks`, snapshotSchema, {
    method: "PUT",
    body: { uris: [...uris] },
  })
}

export function uploadCover(id: string, base64Jpeg: string): Promise<null> {
  return spotifyRequest(`/playlists/${id}/images`, emptyResponseSchema, {
    method: "PUT",
    body: base64Jpeg,
    rawContentType: "image/jpeg",
  })
}

export function unfollowPlaylist(id: string): Promise<null> {
  return spotifyRequest(`/playlists/${id}/followers`, emptyResponseSchema, { method: "DELETE" })
}

const EXERCISE_TRACK_A = "spotify:track:0DiWol3AO6WpXZgp0goxAV"
const EXERCISE_TRACK_B = "spotify:track:1oHNvJVbFkexQc0BpQp7Y4"

const EXERCISE_COVER_JPEG_BASE64 =
  "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAEsASwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AnIDWiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z"

function exerciseName(): string {
  return `[music-spotify exercise ${new Date().toISOString()}]`
}

const meSchema = z.object({ id: z.string() }).passthrough()

async function runWriteLifecycle(): Promise<{ playlistId: string; cleaned: boolean }> {
  const me = await spotifyGet("/me", meSchema)
  const created = await createPlaylist(me.id, {
    name: exerciseName(),
    isPublic: false,
    description: "music-spotify automated self-cleaning exercise — safe to ignore",
  })
  let cleaned = false
  try {
    await getPlaylist(created.id)
    await addTracks(created.id, { uris: [EXERCISE_TRACK_A, EXERCISE_TRACK_B] })
    await getPlaylistTracks(created.id, { limit: 10 })
    await getUserPlaylists(me.id, { limit: 5 })
    await reorderTracks(created.id, { rangeStart: 1, insertBefore: 0 })
    await changePlaylistDetails(created.id, {
      name: `${exerciseName()} edited`,
      description: "music-spotify exercise — details edited",
    })
    await replaceTracks(created.id, [EXERCISE_TRACK_A])
    await uploadCover(created.id, EXERCISE_COVER_JPEG_BASE64)
  } finally {
    await unfollowPlaylist(created.id)
    cleaned = true
  }
  return { playlistId: created.id, cleaned }
}

const descriptor: EndpointDescriptor = {
  name: "playlists",
  scopes: [
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    "ugc-image-upload",
  ],
  probes: [
    {
      name: "GET /me/playlists",
      run: () => getMyPlaylists({ limit: 5 }),
    },
    {
      name: "playlist write lifecycle (create → mutate → cover → unfollow, self-cleaning)",
      run: runWriteLifecycle,
    },
  ],
}

export default descriptor
