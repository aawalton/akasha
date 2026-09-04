import { hlsSegmentObjectKey } from "@akasha/object-store/object-store-key"
import {
  type ObjectStreamResult,
  seaweedFSObjectStoreFromEnv,
} from "@akasha/object-store/seaweedfs-store"
import { mediaTokenSecret, verifyMediaToken } from "@akasha/pages-ui/media/media-token"
import { MEDIA_VARIANT_PATTERN, mediaPageExists } from "@akasha/pages-ui/media/serve-media"
import { resolveRequestUser } from "@akasha/supabase-rr/auth-server"
import { capacitorCorsHeaders, withCors } from "../capacitor-cors/capacitor-cors.module.code.ts"
import { MEDIA_UUID_PATTERN } from "../media-page/media-page.module.code.ts"
import type { Route } from "./+types/api.media.$pageId.$medium.hls.$segment"

const SEGMENT_PATTERN = /^seg[0-9]{5}\.mp3$/

export async function loader({ params, request }: Route.LoaderArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, "GET, OPTIONS")
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: withCors(new Headers(), cors) })
  }

  const url = new URL(request.url)
  const { pageId, medium, segment } = params
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
    !MEDIA_VARIANT_PATTERN.test(variant) ||
    !SEGMENT_PATTERN.test(segment)
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

  let stream: ObjectStreamResult | null
  try {
    stream = await store.getStream(hlsSegmentObjectKey(pageId, segment, { fromSentence }), {
      range: request.headers.get("Range"),
    })
  } catch {
    return respond("Not Found", 404)
  }
  if (!stream) return respond("Not Found", 404)

  const extra: Record<string, string> = {
    "Content-Type": "audio/mpeg",
    "Cache-Control": "private, no-cache",
    "Accept-Ranges": "bytes",
  }
  if (stream.contentLength != null) extra["Content-Length"] = String(stream.contentLength)
  if (stream.contentRange != null) extra["Content-Range"] = stream.contentRange
  return respond(stream.body, stream.status, extra)
}
