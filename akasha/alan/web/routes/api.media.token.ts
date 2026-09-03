import { isMedium } from "@akasha/pages-core/media-formats"
import { mediaTokenSecret, mintMediaToken } from "@akasha/pages-ui/media/media-token"
import { MEDIA_VARIANT_PATTERN, mediaPageExists } from "@akasha/pages-ui/media/serve-media"
import { resolveRequestUser } from "@akasha/supabase-rr/auth-server"
import { capacitorCorsHeaders, withCors } from "../capacitor-cors/capacitor-cors.module.code.ts"
import { MEDIA_UUID_PATTERN } from "../media-page/media-page.module.code.ts"
import type { Route } from "./+types/api.media.token"

const TOKEN_TTL_MS = 60 * 60 * 1000

export function buildMediaTokenResponse(input: {
  user: { id: string } | null
  pageId: string
  medium: string
  variant: string
  pageAccessible: boolean
  secret: string
  nowMs: number
  headers: Headers
}): Response {
  const { user, pageId, medium, variant, pageAccessible, secret, nowMs, headers } = input
  if (!user) return new Response("Unauthorized", { status: 401, headers })
  if (
    !MEDIA_UUID_PATTERN.test(pageId) ||
    !isMedium(medium) ||
    !MEDIA_VARIANT_PATTERN.test(variant)
  ) {
    return new Response("Not Found", { status: 404, headers })
  }
  if (!pageAccessible) return new Response("Not Found", { status: 404, headers })
  const token = mintMediaToken({ pageId, medium, variant }, nowMs + TOKEN_TTL_MS, secret)
  if (token == null) {
    return new Response("Media token signing unavailable", { status: 503, headers })
  }
  headers.set("Content-Type", "application/json")
  headers.set("Cache-Control", "private, no-store")
  return new Response(JSON.stringify({ token }), { status: 200, headers })
}

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, "GET, OPTIONS")

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: withCors(new Headers(), cors) })
  }

  const { user, headers } = await resolveRequestUser(request)
  withCors(headers, cors)
  const url = new URL(request.url)
  const pageId = url.searchParams.get("pageId") ?? ""
  const medium = url.searchParams.get("medium") ?? ""

  let pageAccessible = false
  if (user && pageId !== "" && isMedium(medium)) {
    pageAccessible = await mediaPageExists(pageId)
  }

  return buildMediaTokenResponse({
    user,
    pageId,
    medium,
    variant: url.searchParams.get("variant") ?? "",
    pageAccessible,
    secret: mediaTokenSecret(),
    nowMs: Date.now(),
    headers,
  })
}
