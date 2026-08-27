import { type ObjectStore, seaweedFSObjectStoreFromEnv } from "@shared/object-store"
import { hlsPlaylistObjectKey } from "@shared/object-store/keys"
import { getPage } from "@shared/pages-access/get"
import { mediaTokenSecret, verifyMediaToken } from "@shared/pages-ui/media/media-token"
import { MEDIA_UUID_PATTERN, MEDIA_VARIANT_PATTERN, mediaPageStands } from "@shared/pages-ui/media/serve-media"
import { resolveRequestUser } from "@shared/supabase-rr/auth/server"
import { capacitorCorsHeaders, withCors } from "~/lib/capacitor-cors"
import { forwardedOrigin } from "~/lib/forwarded-origin"
import { ensureHlsPlaylist } from "~/lib/hls-render"
import { resolveChapterKokoroSegments } from "~/lib/kokoro-render"
import { rewriteHlsPlaylist } from "~/lib/rewrite-hls-playlist"
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
  const page = await getPage({ where: [{ key: "id", eq: pageId }] })
  const pageTypeSlug = typeof page?.pageTypeSlug === "string" ? page.pageTypeSlug : null
  if (pageTypeSlug == null) return null
  return resolveChapterKokoroSegments(pageId, pageTypeSlug, { fromSentenceIndex })
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
    if (!(await mediaPageStands(pageId, medium))) return respond("Not Found", 404)
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
