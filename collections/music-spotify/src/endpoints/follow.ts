import { z } from "zod"
import { type CursorPage, cursorPageSchema, spotifyGet, spotifyRequest } from "../client"
import type { EndpointDescriptor } from "./types"

export type FollowType = "artist" | "user"

const artistSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.string().optional(),
    uri: z.string().optional(),
  })
  .passthrough()

export type FollowedArtist = z.infer<typeof artistSchema>

export const followedArtistsResponseSchema = z
  .object({ artists: cursorPageSchema(artistSchema) })
  .passthrough()

export type FollowedArtistsResponse = z.infer<typeof followedArtistsResponseSchema>

export const followContainsSchema = z.array(z.boolean())

const writeAckSchema = z.null()

export function buildFollowedArtistsPath(limit?: number): string {
  const qs = new URLSearchParams({ type: "artist" })
  if (limit !== undefined) qs.set("limit", String(limit))
  return `/me/following?${qs.toString()}`
}

export function buildFollowingMutatePath(type: FollowType, ids: readonly string[]): string {
  const qs = new URLSearchParams({ type })
  qs.set("ids", ids.join(","))
  return `/me/following?${qs.toString()}`
}

export function buildFollowContainsPath(type: FollowType, ids: readonly string[]): string {
  const qs = new URLSearchParams({ type })
  qs.set("ids", ids.join(","))
  return `/me/following/contains?${qs.toString()}`
}

export function buildPlaylistFollowersContainsPath(
  playlistId: string,
  userIds: readonly string[]
): string {
  const qs = new URLSearchParams()
  qs.set("ids", userIds.join(","))
  return `/playlists/${playlistId}/followers/contains?${qs.toString()}`
}

export interface GetFollowedArtistsOptions {
  readonly limit?: number
  readonly max?: number
}

export async function getFollowedArtists(
  options: GetFollowedArtistsOptions = {}
): Promise<FollowedArtist[]> {
  const items: FollowedArtist[] = []
  let next: string | null = buildFollowedArtistsPath(options.limit)
  while (next != null) {
    const page: FollowedArtistsResponse = await spotifyGet(next, followedArtistsResponseSchema)
    const cursorPage: CursorPage<FollowedArtist> = page.artists
    for (const artist of cursorPage.items) items.push(artist)
    if (options.max !== undefined && items.length >= options.max) break
    next = cursorPage.next
  }
  return items
}

export function areFollowingArtists(ids: readonly string[]): Promise<boolean[]> {
  return spotifyGet(buildFollowContainsPath("artist", ids), followContainsSchema)
}

export function areFollowingUsers(ids: readonly string[]): Promise<boolean[]> {
  return spotifyGet(buildFollowContainsPath("user", ids), followContainsSchema)
}

export function playlistFollowedBy(
  playlistId: string,
  userIds: readonly string[]
): Promise<boolean[]> {
  return spotifyGet(buildPlaylistFollowersContainsPath(playlistId, userIds), followContainsSchema)
}

export function followArtists(ids: readonly string[]): Promise<null> {
  return spotifyRequest(buildFollowingMutatePath("artist", ids), writeAckSchema, { method: "PUT" })
}

export function unfollowArtists(ids: readonly string[]): Promise<null> {
  return spotifyRequest(buildFollowingMutatePath("artist", ids), writeAckSchema, {
    method: "DELETE",
  })
}

export function followUsers(ids: readonly string[]): Promise<null> {
  return spotifyRequest(buildFollowingMutatePath("user", ids), writeAckSchema, { method: "PUT" })
}

export function unfollowUsers(ids: readonly string[]): Promise<null> {
  return spotifyRequest(buildFollowingMutatePath("user", ids), writeAckSchema, { method: "DELETE" })
}

export interface FollowPlaylistOptions {
  readonly public?: boolean
}

export function followPlaylist(
  playlistId: string,
  options: FollowPlaylistOptions = {}
): Promise<null> {
  const body = options.public === undefined ? undefined : { public: options.public }
  return spotifyRequest(`/playlists/${playlistId}/followers`, writeAckSchema, {
    method: "PUT",
    body,
  })
}

export function unfollowPlaylist(playlistId: string): Promise<null> {
  return spotifyRequest(`/playlists/${playlistId}/followers`, writeAckSchema, { method: "DELETE" })
}

const PROBE_ARTIST_ID = "4tZwfgrHOc3mvqYlEYSvVi"
const PROBE_PLAYLIST_ID = "37i9dQZF1DXcBWIGoYBM5M"

const meIdSchema = z.object({ id: z.string() }).passthrough()

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

async function artistFollowRoundTrip(): Promise<{ id: string; action: string }> {
  const id = PROBE_ARTIST_ID
  const [wasFollowing] = await areFollowingArtists([id])
  if (wasFollowing === true) {
    return { id, action: "already followed — left as-is" }
  }
  await followArtists([id])
  const [afterFollow] = await areFollowingArtists([id])
  assert(afterFollow === true, `follow did not take effect for artist ${id}`)
  await unfollowArtists([id])
  const [afterUnfollow] = await areFollowingArtists([id])
  assert(afterUnfollow === false, `unfollow did not restore state for artist ${id}`)
  return { id, action: "follow→unfollow round-trip, original state restored" }
}

async function playlistFollowRoundTrip(): Promise<{ playlistId: string; action: string }> {
  const me = await spotifyGet("/me", meIdSchema)
  const playlistId = PROBE_PLAYLIST_ID
  const [wasFollowing] = await playlistFollowedBy(playlistId, [me.id])
  if (wasFollowing === true) {
    return { playlistId, action: "already followed — left as-is" }
  }
  await followPlaylist(playlistId, { public: false })
  const [afterFollow] = await playlistFollowedBy(playlistId, [me.id])
  assert(afterFollow === true, `follow did not take effect for playlist ${playlistId}`)
  await unfollowPlaylist(playlistId)
  const [afterUnfollow] = await playlistFollowedBy(playlistId, [me.id])
  assert(afterUnfollow === false, `unfollow did not restore state for playlist ${playlistId}`)
  return { playlistId, action: "follow→unfollow round-trip, original state restored" }
}

const descriptor: EndpointDescriptor = {
  name: "follow",
  scopes: [
    "user-follow-read",
    "user-follow-modify",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-private",
  ],
  probes: [
    {
      name: "GET /me/following?type=artist (followed artists)",
      run: () => getFollowedArtists({ limit: 20, max: 50 }),
    },
    {
      name: "GET /me/following/contains (artist)",
      run: () => areFollowingArtists([PROBE_ARTIST_ID]),
    },
    {
      name: "GET /playlists/{id}/followers/contains",
      run: async () => {
        const me = await spotifyGet("/me", meIdSchema)
        return playlistFollowedBy(PROBE_PLAYLIST_ID, [me.id])
      },
    },
    {
      name: "PUT/DELETE /me/following (artist, self-cleaning round-trip)",
      run: () => artistFollowRoundTrip(),
    },
    {
      name: "PUT/DELETE /playlists/{id}/followers (self-cleaning round-trip)",
      run: () => playlistFollowRoundTrip(),
    },
  ],
}

export default descriptor
