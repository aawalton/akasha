import { resolveRequestUser } from "@shared/supabase-rr/auth/server"
import { z } from "zod"
import { capacitorCorsHeaders, withCors } from "~/lib/capacitor-cors"
import { resolveQuestion } from "~/questions/lib/resolve-question.server"
import type { Route } from "./+types/api.question.resolve"

const requestSchema = z.object({
  questionId: z.string().min(1),
  action: z.enum(["answer", "dismiss"]),
  content: z.string().optional(),
  answeredOptionIndex: z.number().int().nonnegative().optional(),
})

const CORS_METHODS = "POST, OPTIONS"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }
  return Response.json({ error: "Method not allowed" }, { status: 405, headers: cors })
}

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers: cors })
  }

  const { user, headers } = await resolveRequestUser(request)
  if (user === null) {
    return Response.json(
      { error: "Not authenticated" },
      { status: 401, headers: withCors(headers, cors) }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: withCors(headers, cors) }
    )
  }

  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { error: "Expected { questionId, action, content? }" },
      { status: 400, headers: withCors(headers, cors) }
    )
  }

  const result = await resolveQuestion({
    ...parsed.data,
    sessionUserId: user.id,
    sender: { accountUserId: user.id, personSlug: null },
  })
  if (!result.ok) {
    return Response.json(
      { ok: false, error: result.error },
      { status: 409, headers: withCors(headers, cors) }
    )
  }

  return Response.json(
    { ok: true, nextHref: result.nextHref },
    { headers: withCors(headers, cors) }
  )
}
