import { resolveRequestUser } from "@akasha/supabase-rr/auth-server"
import {
  ensureReadAloudRendition,
  resolveChapterKokoroSegments,
} from "../kokoro-render/kokoro-render.module.code.ts"
import { resolveMediaPage } from "../media-page/media-page.module.code.ts"
import type { Route } from "./+types/api.media.$pageId.$medium.ensure"

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const CAPACITOR_ORIGIN = "capacitor://localhost"

function corsHeaders(request: Request): Record<string, string> {
  return request.headers.get("Origin") === CAPACITOR_ORIGIN
    ? {
        "Access-Control-Allow-Origin": CAPACITOR_ORIGIN,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      }
    : {}
}

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const cors = corsHeaders(request)
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors })
  return new Response("Method Not Allowed", { status: 405, headers: cors })
}

export async function action({ params, request }: Route.ActionArgs): Promise<Response> {
  const cors = corsHeaders(request)
  const { user, headers } = await resolveRequestUser(request)
  const respond = (body: unknown, status: number): Response => {
    const merged = new Headers(headers)
    for (const [k, v] of Object.entries(cors)) merged.set(k, v)
    merged.set("Content-Type", "application/json")
    return new Response(JSON.stringify(body), { status, headers: merged })
  }

  if (!user) return respond({ error: "Unauthorized" }, 401)

  const { pageId, medium } = params
  if (!UUID_PATTERN.test(pageId)) return respond({ error: "Not Found" }, 404)
  if (medium !== "audio") return respond({ error: "Not Found" }, 404)
  const found = await resolveMediaPage(pageId, ["id"])
  if (found === null) return respond({ error: "Not Found" }, 404)

  const segments = await resolveChapterKokoroSegments(pageId, found.pageTypeSlug)
  if (segments == null) return respond({ error: "Not Found" }, 404)

  const status = await ensureReadAloudRendition(pageId, segments)
  return respond({ status }, status === "generating" ? 202 : 200)
}
