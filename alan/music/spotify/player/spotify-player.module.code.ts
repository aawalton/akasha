import { z } from "zod"
import {
  cursorPageSchema,
  spotifyGet,
  spotifyRequest,
} from "../client/spotify-client.module.code.ts"

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

export type DeviceOption = {
  readonly deviceId?: string
}

export type RecentlyPlayedOptions = {
  readonly limit?: number
  readonly after?: number
  readonly before?: number
}

export type StartResumeOptions = DeviceOption & {
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
    if (value !== undefined) search.set(key, String(value))
  }
  const asked = search.toString()
  return asked.length > 0 ? `${path}?${asked}` : path
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
