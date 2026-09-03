import { getPage } from "@akasha/pages-access/get"
import { getMediaConfig } from "@akasha/pages-access/page-type-config"
import { resolveRequestUser } from "@akasha/supabase-rr/auth-server"
import { DEFAULT_VOICE_INFER_URL } from "@akasha/voice-core/voice/infer-endpoint"
import { buildKokoroSpeechSegments } from "@akasha/voice-core/voice/speech"
import { ensureReadAloudRendition } from "../kokoro-render/kokoro-render.module.code.ts"
import { resolveMediaPage } from "../media-page/media-page.module.code.ts"
import type { Route } from "./+types/api.media.$pageId.$medium.stream"

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const KOKORO_VOICE = "af_heart"

const FIRST_CHUNK_TIMEOUT_MS = 120_000

function buildStreamingWavHeader(): Uint8Array {
  const h = new DataView(new ArrayBuffer(44))
  const ascii = (offset: number, s: string) => {
    for (let i = 0; i < s.length; i++) h.setUint8(offset + i, s.charCodeAt(i))
  }
  ascii(0, "RIFF")
  h.setUint32(4, 0xffffffff, true)
  ascii(8, "WAVE")
  ascii(12, "fmt ")
  h.setUint32(16, 16, true)
  h.setUint16(20, 1, true)
  h.setUint16(22, 1, true)
  h.setUint32(24, 24_000, true)
  h.setUint32(28, 48_000, true)
  h.setUint16(32, 2, true)
  h.setUint16(34, 16, true)
  ascii(36, "data")
  h.setUint32(40, 0xffffffff, true)
  return new Uint8Array(h.buffer)
}

const STREAMING_WAV_HEADER = buildStreamingWavHeader()

const CAPACITOR_ORIGIN = "capacitor://localhost"

function corsHeaders(request: Request): Record<string, string> {
  return request.headers.get("Origin") === CAPACITOR_ORIGIN
    ? {
        "Access-Control-Allow-Origin": CAPACITOR_ORIGIN,
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      }
    : {}
}

export async function loader({ params, request }: Route.LoaderArgs): Promise<Response> {
  const cors = corsHeaders(request)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }

  const { user, headers } = await resolveRequestUser(request)
  const respond = (body: BodyInit | null, status: number, extra?: HeadersInit): Response => {
    const merged = new Headers(headers)
    for (const [k, v] of Object.entries(cors)) merged.set(k, v)
    if (extra) for (const [k, v] of new Headers(extra).entries()) merged.set(k, v)
    return new Response(body, { status, headers: merged })
  }

  if (!user) return respond("Unauthorized", 401)

  const { pageId, medium } = params
  if (!UUID_PATTERN.test(pageId)) return respond("Not Found", 404)
  if (medium !== "audio") return respond("Not Found", 404)
  const found = await resolveMediaPage(pageId, ["id"])
  if (found === null) return respond("Not Found", 404)

  const pageTypeSlug = found.pageTypeSlug
  const mediaConfig = await getMediaConfig({ pageTypeSlug })
  const sourcePropertyId = mediaConfig?.audio?.sourcePropertyId
  if (sourcePropertyId == null) return respond("Not Found", 404)

  const textRow = await getPage({
    pageTypeSlug,
    where: [{ key: "id", eq: pageId }],
    select: ["id", sourcePropertyId],
  })
  const textValue = textRow?.[sourcePropertyId]
  const rawText = typeof textValue === "string" ? textValue : ""
  const fromSentenceParam = new URL(request.url).searchParams.get("fromSentence")
  const parsedFrom = fromSentenceParam == null ? 0 : Number.parseInt(fromSentenceParam, 10)
  const fromSentenceIndex = Number.isFinite(parsedFrom) && parsedFrom > 0 ? parsedFrom : 0
  const segments = buildKokoroSpeechSegments(rawText, { fromSentenceIndex })
  if (segments.length === 0) return respond("Not Found", 404)

  const abort = new AbortController()
  const firstChunkTimer = setTimeout(() => abort.abort(), FIRST_CHUNK_TIMEOUT_MS)

  let ensureFired = false
  const fireEnsureOnce = (): undefined => {
    if (ensureFired) return
    ensureFired = true
    if (fromSentenceIndex !== 0) return
    void ensureReadAloudRendition(pageId, segments)
  }

  const onClientDisconnect = () => {
    clearTimeout(firstChunkTimer)
    abort.abort()
  }
  if (request.signal.aborted) onClientDisconnect()
  else request.signal.addEventListener("abort", onClientDisconnect, { once: true })
  let upstream: Response
  try {
    upstream = await fetch(`${DEFAULT_VOICE_INFER_URL}/v1/audio/speech/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ segments, voice: KOKORO_VOICE }),
      signal: abort.signal,
    })
  } catch {
    clearTimeout(firstChunkTimer)
    return respond("Audio service unavailable", 502)
  }
  if (!upstream.ok || upstream.body == null) {
    clearTimeout(firstChunkTimer)
    return respond("Audio service error", 502)
  }

  const reader = upstream.body.getReader()
  let firstChunkSeen = false
  const wavStream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(STREAMING_WAV_HEADER)
    },
    async pull(controller) {
      let chunk: Awaited<ReturnType<typeof reader.read>>
      try {
        chunk = await reader.read()
      } catch {
        clearTimeout(firstChunkTimer)
        controller.error(new Error("voice-infer stream aborted"))
        return
      }
      if (!firstChunkSeen) {
        firstChunkSeen = true
        clearTimeout(firstChunkTimer)
      }
      if (chunk.done) {
        fireEnsureOnce()
        controller.close()
        return
      }
      controller.enqueue(chunk.value)
    },
    cancel(reason) {
      clearTimeout(firstChunkTimer)
      void reader.cancel(reason)
    },
  })

  return respond(wavStream, 200, {
    "Content-Type": "audio/wav",
    "Cache-Control": "private, no-cache",
  })
}
