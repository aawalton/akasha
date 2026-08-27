import { z } from "zod"
import { cursorPageSchema, spotifyGet, spotifyRequest } from "../client"
import type { EndpointDescriptor } from "./types"

const emptyBodySchema = z.null()

const deviceSchema = z
  .object({
    id: z.string().nullable(),
    is_active: z.boolean(),
    is_private_session: z.boolean(),
    is_restricted: z.boolean(),
    name: z.string(),
    type: z.string(),
    volume_percent: z.number().nullable(),
  })
  .passthrough()

const playerItemSchema = z
  .object({
    id: z.string().nullable(),
    uri: z.string(),
    name: z.string(),
    type: z.string(),
    duration_ms: z.number().optional(),
  })
  .passthrough()

const contextSchema = z
  .object({
    type: z.string(),
    uri: z.string(),
    href: z.string().nullable().optional(),
  })
  .passthrough()
  .nullable()

export const playbackStateSchema = z
  .object({
    device: deviceSchema,
    repeat_state: z.string(),
    shuffle_state: z.boolean(),
    context: contextSchema,
    is_playing: z.boolean(),
    progress_ms: z.number().nullable(),
    item: playerItemSchema.nullable(),
    currently_playing_type: z.string(),
  })
  .passthrough()

export const devicesSchema = z.object({ devices: z.array(deviceSchema) }).passthrough()

export const currentlyPlayingSchema = z
  .object({
    context: contextSchema,
    progress_ms: z.number().nullable(),
    is_playing: z.boolean(),
    item: playerItemSchema.nullable(),
    currently_playing_type: z.string(),
  })
  .passthrough()

export const playHistorySchema = z
  .object({
    track: playerItemSchema,
    played_at: z.string(),
    context: contextSchema,
  })
  .passthrough()

export const queueSchema = z
  .object({
    currently_playing: playerItemSchema.nullable(),
    queue: z.array(playerItemSchema),
  })
  .passthrough()

export interface DeviceOption {
  readonly deviceId?: string
}

export interface RecentlyPlayedOptions {
  readonly limit?: number
  readonly after?: number
  readonly before?: number
}

export interface StartResumeOptions extends DeviceOption {
  readonly contextUri?: string
  readonly uris?: readonly string[]
  readonly offset?: { readonly position?: number; readonly uri?: string }
  readonly positionMs?: number
}

export type RepeatState = "track" | "context" | "off"

export function withQuery(
  path: string,
  params: Readonly<Record<string, string | number | boolean | undefined>>
): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      search.set(key, String(value))
    }
  }
  const qs = search.toString()
  return qs.length > 0 ? `${path}?${qs}` : path
}

async function put(path: string, body?: unknown): Promise<void> {
  await spotifyRequest(path, emptyBodySchema, {
    method: "PUT",
    ...(body !== undefined && { body }),
  })
}

async function post(path: string, body?: unknown): Promise<void> {
  await spotifyRequest(path, emptyBodySchema, {
    method: "POST",
    ...(body !== undefined && { body }),
  })
}

export function getPlaybackState(): Promise<z.infer<typeof playbackStateSchema> | null> {
  return spotifyRequest("/me/player", playbackStateSchema.nullable())
}

export function getDevices(): Promise<z.infer<typeof devicesSchema>> {
  return spotifyGet("/me/player/devices", devicesSchema)
}

export function getCurrentlyPlaying(): Promise<z.infer<typeof currentlyPlayingSchema> | null> {
  return spotifyRequest("/me/player/currently-playing", currentlyPlayingSchema.nullable())
}

export function getRecentlyPlayed(options: RecentlyPlayedOptions = {}) {
  const path = withQuery("/me/player/recently-played", {
    limit: options.limit,
    after: options.after,
    before: options.before,
  })
  return spotifyGet(path, cursorPageSchema(playHistorySchema))
}

export function getQueue(): Promise<z.infer<typeof queueSchema>> {
  return spotifyGet("/me/player/queue", queueSchema)
}

export function transferPlayback(deviceIds: readonly string[], play?: boolean): Promise<void> {
  return put("/me/player", { device_ids: deviceIds, ...(play !== undefined && { play }) })
}

export function startResumePlayback(options: StartResumeOptions = {}): Promise<void> {
  const body = {
    ...(options.contextUri !== undefined && { context_uri: options.contextUri }),
    ...(options.uris !== undefined && { uris: options.uris }),
    ...(options.offset !== undefined && { offset: options.offset }),
    ...(options.positionMs !== undefined && { position_ms: options.positionMs }),
  }
  const path = withQuery("/me/player/play", { device_id: options.deviceId })
  return put(path, Object.keys(body).length > 0 ? body : undefined)
}

export function pausePlayback(options: DeviceOption = {}): Promise<void> {
  return put(withQuery("/me/player/pause", { device_id: options.deviceId }))
}

export function skipToNext(options: DeviceOption = {}): Promise<void> {
  return post(withQuery("/me/player/next", { device_id: options.deviceId }))
}

export function skipToPrevious(options: DeviceOption = {}): Promise<void> {
  return post(withQuery("/me/player/previous", { device_id: options.deviceId }))
}

export function seek(positionMs: number, options: DeviceOption = {}): Promise<void> {
  return put(withQuery("/me/player/seek", { position_ms: positionMs, device_id: options.deviceId }))
}

export function setRepeatMode(state: RepeatState, options: DeviceOption = {}): Promise<void> {
  return put(withQuery("/me/player/repeat", { state, device_id: options.deviceId }))
}

export function setVolume(volumePercent: number, options: DeviceOption = {}): Promise<void> {
  return put(
    withQuery("/me/player/volume", {
      volume_percent: volumePercent,
      device_id: options.deviceId,
    })
  )
}

export function toggleShuffle(state: boolean, options: DeviceOption = {}): Promise<void> {
  return put(withQuery("/me/player/shuffle", { state, device_id: options.deviceId }))
}

export function addToQueue(uri: string, options: DeviceOption = {}): Promise<void> {
  return post(withQuery("/me/player/queue", { uri, device_id: options.deviceId }))
}

const SAMPLE_TRACK_URI = "spotify:track:4cOdK2wGLETKBW3PvgPWqT"

const descriptor: EndpointDescriptor = {
  name: "player",
  scopes: [
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-modify-playback-state",
  ],
  probes: [
    { name: "GET /me/player", run: getPlaybackState },
    { name: "GET /me/player/devices", run: getDevices },
    { name: "GET /me/player/currently-playing", run: getCurrentlyPlaying },
    { name: "GET /me/player/recently-played", run: () => getRecentlyPlayed({ limit: 5 }) },
    { name: "GET /me/player/queue", run: getQueue },
    {
      name: "PUT /me/player (transfer)",
      manual: true,
      run: async () => {
        const { devices } = await getDevices()
        const target = devices.find((device) => device.id !== null)
        if (target?.id == null) {
          throw new Error("no device available to transfer to")
        }
        return transferPlayback([target.id])
      },
    },
    { name: "PUT /me/player/play", manual: true, run: () => startResumePlayback() },
    { name: "PUT /me/player/pause", manual: true, run: () => pausePlayback() },
    { name: "POST /me/player/next", manual: true, run: () => skipToNext() },
    { name: "POST /me/player/previous", manual: true, run: () => skipToPrevious() },
    { name: "PUT /me/player/seek", manual: true, run: () => seek(0) },
    { name: "PUT /me/player/repeat", manual: true, run: () => setRepeatMode("context") },
    { name: "PUT /me/player/volume", manual: true, run: () => setVolume(50) },
    { name: "PUT /me/player/shuffle", manual: true, run: () => toggleShuffle(false) },
    { name: "POST /me/player/queue", manual: true, run: () => addToQueue(SAMPLE_TRACK_URI) },
  ],
}

export default descriptor
