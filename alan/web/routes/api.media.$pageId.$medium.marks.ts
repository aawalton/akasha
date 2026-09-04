import { seaweedFSObjectStoreFromEnv } from "@akasha/object-store/seaweedfs-store"
import { resolveRequestUser } from "@akasha/supabase-rr/auth-server"
import { resolveMediaPage } from "../media-page/media-page.module.code.ts"
import { resolveFromNSentenceMarks } from "../read-aloud-marks/read-aloud-marks.module.code.ts"
import type { Route } from "./+types/api.media.$pageId.$medium.marks"

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function loader({ params, request }: Route.LoaderArgs): Promise<Response> {
  const { user, headers } = await resolveRequestUser(request)
  const respond = (body: BodyInit | null, status: number, extra?: HeadersInit): Response => {
    const merged = new Headers(headers)
    if (extra) for (const [k, v] of new Headers(extra).entries()) merged.set(k, v)
    return new Response(body, { status, headers: merged })
  }
  const json = (value: unknown): Response =>
    respond(JSON.stringify(value), 200, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    })

  if (!user) return respond("Unauthorized", 401)

  const { pageId, medium } = params
  if (!UUID_PATTERN.test(pageId)) return respond("Not Found", 404)
  if (medium !== "audio") return respond("Not Found", 404)
  const found = await resolveMediaPage(pageId, ["id"])
  if (found === null) return respond("Not Found", 404)
  const pageTypeSlug = found.pageTypeSlug

  const fromSentenceRaw = new URL(request.url).searchParams.get("fromSentence")
  const parsed = fromSentenceRaw == null ? 0 : Number.parseInt(fromSentenceRaw, 10)
  const fromSentence = Number.isFinite(parsed) && parsed > 0 ? parsed : 0

  const store = seaweedFSObjectStoreFromEnv()
  const marks = store
    ? await resolveFromNSentenceMarks(store, { pageId, pageTypeSlug, fromSentence })
    : []
  return json({ marks })
}
