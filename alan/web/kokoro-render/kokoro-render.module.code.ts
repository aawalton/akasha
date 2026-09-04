import { type ObjectStore, seaweedFSObjectStoreFromEnv } from "@akasha/object-store/seaweedfs-store"
import { getPage } from "@akasha/pages-access/get"
import { getMediaConfig } from "@akasha/pages-access/page-type-config"
import { DEFAULT_VOICE_INFER_URL } from "@akasha/voice-core/voice/infer-endpoint"
import { buildKokoroSpeechSegments } from "@akasha/voice-core/voice/speech"
import {
  readAloudKey,
  storedReadAloudExists,
} from "../read-aloud-persist/read-aloud-persist.module.code.ts"

const KOKORO_VOICE = "af_heart"

const RENDER_TIMEOUT_MS = 1_200_000

const TRIGGER_ACK_TIMEOUT_MS = 30_000

const STORE_POLL_INTERVAL_MS = 5_000

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

const inFlight = new Set<string>()

function claimRenderLock(pageId: string): boolean {
  if (inFlight.has(pageId)) return false
  inFlight.add(pageId)
  return true
}

function releaseRenderLock(pageId: string): undefined {
  inFlight.delete(pageId)
}

export type EnsureStatus = "ready" | "generating" | "unavailable"

export async function resolveChapterKokoroSegments(
  pageId: string,
  pageTypeSlug: string,
  opts?: { readonly fromSentenceIndex?: number }
): Promise<readonly string[] | null> {
  const mediaConfig = await getMediaConfig({ pageTypeSlug })
  const sourcePropertyId = mediaConfig?.audio?.sourcePropertyId
  if (sourcePropertyId == null) return null
  const textRow = await getPage({
    pageTypeSlug,
    where: [{ key: "id", eq: pageId }],
    select: ["id", sourcePropertyId],
  })
  const textValue = textRow?.[sourcePropertyId]
  const rawText = typeof textValue === "string" ? textValue : ""
  const segments = buildKokoroSpeechSegments(rawText, {
    fromSentenceIndex: opts?.fromSentenceIndex,
  })
  return segments.length === 0 ? null : segments
}

export type EnsureDeps = {
  storedExists: (pageId: string) => Promise<boolean>
  startRender: (pageId: string, segments: readonly string[]) => "started" | "unavailable"
}

const defaultDeps: EnsureDeps = {
  storedExists: storedReadAloudExists,
  startRender: (pageId, segments) => {
    const store = seaweedFSObjectStoreFromEnv()
    if (store == null) return "unavailable"
    void triggerAndAwaitStored(pageId, segments, store).finally(() => releaseRenderLock(pageId))
    return "started"
  },
}

export async function ensureReadAloudRendition(
  pageId: string,
  segments: readonly string[],
  deps: EnsureDeps = defaultDeps
): Promise<EnsureStatus> {
  if (!claimRenderLock(pageId)) return "generating"
  try {
    if (await deps.storedExists(pageId)) {
      releaseRenderLock(pageId)
      return "ready"
    }
    const started = deps.startRender(pageId, segments)
    if (started === "unavailable") {
      releaseRenderLock(pageId)
      return "unavailable"
    }
    return "generating"
  } catch (err) {
    releaseRenderLock(pageId)
    throw err
  }
}

async function triggerAndAwaitStored(
  pageId: string,
  segments: readonly string[],
  store: ObjectStore
): Promise<void> {
  if (!(await fireRenderTrigger(segments, readAloudKey(pageId)))) return
  const deadline = Date.now() + RENDER_TIMEOUT_MS
  while (Date.now() < deadline) {
    await sleep(STORE_POLL_INTERVAL_MS)
    if (await storedReadAloudExists(pageId, store)) return
  }
}

async function fireRenderTrigger(segments: readonly string[], key: string): Promise<boolean> {
  const abort = new AbortController()
  const timer = setTimeout(() => abort.abort(), TRIGGER_ACK_TIMEOUT_MS)
  try {
    const res = await fetch(`${DEFAULT_VOICE_INFER_URL}/v1/audio/speech/mp3`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ segments, voice: KOKORO_VOICE, key }),
      signal: abort.signal,
    })
    return res.ok
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}
