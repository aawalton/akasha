import { resolveRequestUser } from "@shared/supabase-rr/auth/server"
import { capacitorCorsHeaders, withCors } from "~/lib/capacitor-cors"
import { markTurnRead } from "../awen/lib/mark-turn-read.server"
import { ReadMarkInputSchema } from "../awen/lib/submit-read-mark"
import type { Route } from "./+types/api.awen.read.$externalId"

const CORS_METHODS = "POST, OPTIONS"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }
  return Response.json({ ok: false }, { status: 405, headers: cors })
}

export async function action({ request, params }: Route.ActionArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  const { user, headers } = await resolveRequestUser(request)
  if (user === null) {
    return Response.json({ ok: false }, { status: 401, headers: withCors(headers, cors) })
  }
  const externalId = params.externalId
  if (externalId === undefined || externalId === "") {
    return Response.json({ ok: false }, { status: 400, headers: withCors(headers, cors) })
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false }, { status: 400, headers: withCors(headers, cors) })
  }
  const parsed = ReadMarkInputSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ ok: false }, { status: 400, headers: withCors(headers, cors) })
  }
  const result = await markTurnRead({
    externalId,
    turnId: parsed.data.turnId,
    sessionUserId: user.id,
  })
  return Response.json(
    { ok: result.ok },
    { status: result.status, headers: withCors(headers, cors) }
  )
}
