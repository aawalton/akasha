import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import {
  actionOnlyLoader,
  capacitorCorsHeaders,
  withCors,
} from "akasha/alan/web/modules/capacitor-cors/capacitor-cors.module.code.ts"
import {
  narrationCarriedOn,
  narrationIdIs,
  refusedAnswer,
} from "akasha/story/chapter/narration/modules/telling/narration-telling.module.code.ts"
import { z } from "zod"

const CORS_METHODS = "POST, OPTIONS"

const PLAYING = z.object({ pageType: z.string().min(1), slug: z.string().min(1) })

export const loader = actionOnlyLoader(CORS_METHODS)

export async function action({
  params,
  request,
}: {
  params: { id: string }
  request: Request
}): Promise<Response> {
  const headers = withCors(new Headers(), capacitorCorsHeaders(request, CORS_METHODS))
  if (request.method !== "POST") return refusedAnswer("method-not-allowed", 405, headers)
  if ((await signedInAs(request)) === null) {
    return refusedAnswer("Not authenticated.", 401, headers)
  }
  if (!narrationIdIs(params.id)) return refusedAnswer("No narration has that id.", 404, headers)
  let held: unknown
  try {
    held = await request.json()
  } catch {
    return refusedAnswer("Invalid request body.", 400, headers)
  }
  const playing = PLAYING.safeParse(held)
  if (!playing.success) {
    return refusedAnswer("The chapter playing is named by page type and slug.", 400, headers)
  }
  const carried = await narrationCarriedOn(params.id, playing.data.pageType, playing.data.slug)
  if ("refused" in carried) return refusedAnswer(carried.refused, carried.status, headers)
  return Response.json({ ok: true, chapter: carried.held.chapter }, { headers })
}
