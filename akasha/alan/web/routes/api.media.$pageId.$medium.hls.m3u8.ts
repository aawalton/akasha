import { hlsPlaylistObjectKey } from "@akasha/object-store/object-store-key"
import { type ObjectStore, seaweedFSObjectStoreFromEnv } from "@akasha/object-store/seaweedfs-store"
import { mediaTokenSecret, verifyMediaToken } from "@akasha/pages-ui/media/media-token"
import { MEDIA_VARIANT_PATTERN, mediaPageExists } from "@akasha/pages-ui/media/serve-media"
import { resolveRequestUser } from "@akasha/supabase-rr/auth-server"
import { capacitorCorsHeaders, withCors } from "../capacitor-cors/capacitor-cors.module.code.ts"
import { forwardedOrigin } from "../forwarded-origin/forwarded-origin.module.code.ts"
import { ensureHlsPlaylist } from "../hls-render/hls-render.module.code.ts"
import { resolveChapterKokoroSegments } from "../kokoro-render/kokoro-render.module.code.ts"
import { MEDIA_UUID_PATTERN, resolveMediaPage } from "../media-page/media-page.module.code.ts"
import { rewriteHlsPlaylist } from "../rewrite-hls-playlist/rewrite-hls-playlist.module.code.ts"
import type { Route } from "./+types/api.media.$pageId.$medium.hls.m3u8"

async function readPlaylist(
  store: ObjectStore,
  pageId: string,
  fromSentence: number
): Promise<string | null> {
  try {
    return new TextDecoder().decode(await store.get(hlsPlaylistObjectKey(pageId, { fromSentence })))
  } catch {
    return null
  }
}

async function resolveChapterSegments(
  pageId: string,
  fromSentenceIndex: number
): Promise<readonly string[] | null> {
  const found = await resolveMediaPage(pageId, ["id"])
  if (found === null) return null
  return resolveChapterKokoroSegments(pageId, found.pageTypeSlug, { fromSentenceIndex })
}

export async function loader({ params, request }: Route.LoaderArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, "GET, OPTIONS")
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: withCors(new Headers(), cors) })
  }

  const url = new URL(request.url)
  const { pageId, medium } = params
  const variant = url.searchParams.get("variant")
  const fromSentenceRaw = url.searchParams.get("fromSentence")
  const parsedFrom = fromSentenceRaw == null ? 0 : Number.parseInt(fromSentenceRaw, 10)
  const fromSentence = Number.isFinite(parsedFrom) && parsedFrom > 0 ? parsedFrom : 0

  let headers = new Headers()
  const respond = (body: BodyInit | null, status: number, extra?: HeadersInit): Response => {
    const merged = withCors(new Headers(headers), cors)
    if (extra) for (const [k, v] of new Headers(extra).entries()) merged.set(k, v)
    return new Response(body, { status, headers: merged })
  }

  if (
    !MEDIA_UUID_PATTERN.test(pageId) ||
    medium !== "audio" ||
    variant == null ||
    !MEDIA_VARIANT_PATTERN.test(variant)
  ) {
    return respond("Not Found", 404)
  }

  const token = url.searchParams.get("token")
  if (token != null) {
    if (!verifyMediaToken(token, { pageId, medium, variant }, mediaTokenSecret())) {
      return respond("Unauthorized", 401)
    }
  } else {
    const { user, headers: authHeaders } = await resolveRequestUser(request)
    headers = authHeaders
    if (!user) return respond("Unauthorized", 401)
    if (!(await mediaPageExists(pageId))) return respond("Not Found", 404)
  }

  const store = seaweedFSObjectStoreFromEnv()
  if (!store) return respond("Not Found", 404)

  const origin = forwardedOrigin(url, request.headers.get("x-forwarded-proto"))
  const rewriteOpts = { origin, pageId, medium, variant, token, fromSentence }
  const playlistBody = (text: string): Response =>
    respond(rewriteHlsPlaylist(text, rewriteOpts), 200, {
      "Content-Type": "application/vnd.apple.mpegurl",
      "Cache-Control": "no-store",
    })

  const existing = await readPlaylist(store, pageId, fromSentence)
  if (existing != null) return playlistBody(existing)

  const segments = await resolveChapterSegments(pageId, fromSentence)
  if (segments == null) return respond("Not Found", 404)

  const { status } = await ensureHlsPlaylist(pageId, segments, store, { fromSentence })
  if (status === "live") {
    const published = await readPlaylist(store, pageId, fromSentence)
    if (published != null) return playlistBody(published)
  }
  if (status === "unavailable") return respond("Not Found", 404)
  return respond("Generating", 503, { "Retry-After": "1", "Cache-Control": "no-store" })
}
