import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import {
  actionOnlyLoader,
  capacitorCorsHeaders,
  withCors,
} from "akasha/alan/web/modules/capacitor-cors/capacitor-cors.module.code.ts"
import {
  narrationClosed,
  narrationIdIs,
  refusedAnswer,
} from "akasha/story/chapter/narration/modules/telling/narration-telling.module.code.ts"

const CORS_METHODS = "DELETE, OPTIONS"

export const loader = actionOnlyLoader(CORS_METHODS)

export async function action({
  params,
  request,
}: {
  params: { id: string }
  request: Request
}): Promise<Response> {
  const headers = withCors(new Headers(), capacitorCorsHeaders(request, CORS_METHODS))
  if (request.method !== "DELETE") return refusedAnswer("method-not-allowed", 405, headers)
  if ((await signedInAs(request)) === null) {
    return refusedAnswer("Not authenticated.", 401, headers)
  }
  if (!narrationIdIs(params.id)) return refusedAnswer("No narration has that id.", 404, headers)
  const closed = await narrationClosed(params.id)
  if ("refused" in closed) return refusedAnswer(closed.refused, closed.status, headers)
  return Response.json({ ok: true }, { headers })
}
