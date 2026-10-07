import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import {
  actionOnlyLoader,
  capacitorCorsHeaders,
  withCors,
} from "akasha/alan/web/modules/capacitor-cors/capacitor-cors.module.code.ts"
import {
  narrationIdIs,
  refusedAnswer,
} from "akasha/story/chapter/narration/modules/telling/narration-telling.module.code.ts"
import { z } from "zod"

const CORS_METHODS = "POST, OPTIONS"

const PLAIN = z.union([z.string().max(300), z.number(), z.boolean(), z.null()])

const REPORT = z.record(z.string().max(40), PLAIN).refine((held) => {
  const event = held.event
  return typeof event === "string" && event.length > 0 && event.length <= 40
})

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
  const report = REPORT.safeParse(held)
  if (!report.success) {
    return refusedAnswer("A report names its event and holds short plain values.", 400, headers)
  }
  console.log(`[narration-report] ${params.id} ${JSON.stringify(report.data)}`)
  return Response.json({ ok: true }, { headers })
}
