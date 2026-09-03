import {
  type HlsKeyOpts,
  hlsPlaylistObjectKey,
  hlsSegmentPrefix,
} from "@akasha/object-store/object-store-key"
import type { ObjectStore } from "@akasha/object-store/seaweedfs-store"
import { DEFAULT_VOICE_INFER_URL } from "@akasha/voice-core/voice/infer-endpoint"
import { z } from "zod"
import { readAloudKey } from "../read-aloud-persist/read-aloud-persist.module.code.ts"

const KOKORO_VOICE = "af_heart"

const TRIGGER_ACK_TIMEOUT_MS = 30_000

const PLAYLIST_POLL_INTERVAL_MS = 1_000
const PLAYLIST_APPEAR_TIMEOUT_MS = 12_000

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

const hlsAckSchema = z
  .object({
    status: z.enum(["accepted", "already-rendering"]),
    key: z.string(),
  })
  .strict()

export type HlsPlaylistStatus = "live" | "generating" | "unavailable"

const inFlight = new Set<string>()

function claimLock(playlistKey: string): boolean {
  if (inFlight.has(playlistKey)) return false
  inFlight.add(playlistKey)
  return true
}

async function playlistExists(
  pageId: string,
  store: ObjectStore,
  opts?: HlsKeyOpts
): Promise<boolean> {
  try {
    return (await store.head(hlsPlaylistObjectKey(pageId, opts))) !== null
  } catch {
    return false
  }
}

export async function ensureHlsPlaylist(
  pageId: string,
  segments: readonly string[],
  store: ObjectStore | null,
  opts?: HlsKeyOpts
): Promise<{ status: HlsPlaylistStatus }> {
  if (store == null) return { status: "unavailable" }
  if (await playlistExists(pageId, store, opts)) return { status: "live" }
  const playlistKey = hlsPlaylistObjectKey(pageId, opts)
  if (!claimLock(playlistKey)) return { status: "generating" }
  try {
    if (await playlistExists(pageId, store, opts)) return { status: "live" }
    if (!(await fireHlsRenderTrigger(pageId, segments, opts))) return { status: "unavailable" }
    const deadline = Date.now() + PLAYLIST_APPEAR_TIMEOUT_MS
    while (Date.now() < deadline) {
      await sleep(PLAYLIST_POLL_INTERVAL_MS)
      if (await playlistExists(pageId, store, opts)) return { status: "live" }
    }
    return { status: "generating" }
  } finally {
    inFlight.delete(playlistKey)
  }
}

async function fireHlsRenderTrigger(
  pageId: string,
  segments: readonly string[],
  opts?: HlsKeyOpts
): Promise<boolean> {
  const abort = new AbortController()
  const timer = setTimeout(() => abort.abort(), TRIGGER_ACK_TIMEOUT_MS)
  try {
    const res = await fetch(`${DEFAULT_VOICE_INFER_URL}/v1/audio/speech/hls`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        segments,
        voice: KOKORO_VOICE,
        playlistKey: hlsPlaylistObjectKey(pageId, opts),
        segmentPrefix: hlsSegmentPrefix(pageId, opts),
        mp3Key: readAloudKey(pageId, opts),
      }),
      signal: abort.signal,
    })
    if (!res.ok) return false
    hlsAckSchema.parse(await res.json())
    return true
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}
