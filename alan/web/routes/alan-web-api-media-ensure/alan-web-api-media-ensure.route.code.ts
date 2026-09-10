import { lowerUuid } from "@akasha/pages/name-format/lower-uuid"
import { resolveRequestUser } from "akasha/alan/harness/supabase-rr/auth-server/auth-server.module.code.ts"
import {
  ensureReadAloudRendition,
  resolveChapterKokoroSegments,
} from "../../kokoro-render/kokoro-render.module.code.ts"
import { resolveMediaPage } from "../../media-page/media-page.module.code.ts"

const SHELL_ORIGINS: readonly string[] = ["https://alanwalton.com", "capacitor://localhost"]

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("Origin")
  return origin !== null && SHELL_ORIGINS.includes(origin)
    ? {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      }
    : {}
}

export async function loader({ request }: { request: Request }): Promise<Response> {
  const cors = corsHeaders(request)
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors })
  return new Response("Method Not Allowed", { status: 405, headers: cors })
}

export async function action({
  params,
  request,
}: {
  params: { pageId: string; medium: string }
  request: Request
}): Promise<Response> {
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
  if (!lowerUuid(pageId.toLowerCase())) return respond({ error: "Not Found" }, 404)
  if (medium !== "audio") return respond({ error: "Not Found" }, 404)
  const found = await resolveMediaPage(pageId, ["id"])
  if (found === null) return respond({ error: "Not Found" }, 404)

  const segments = await resolveChapterKokoroSegments(pageId, found.pageTypeSlug)
  if (segments == null) return respond({ error: "Not Found" }, 404)

  const made = await ensureReadAloudRendition(pageId, segments)
  return respond({ status: made }, made === "generating" ? 202 : 200)
}
