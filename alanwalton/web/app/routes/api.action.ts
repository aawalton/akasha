import { resolveRequestUser } from "@shared/supabase-rr/auth/server"
import { capacitorCorsHeaders, withCors } from "~/lib/capacitor-cors"
import { loadGame } from "../awen/lib/game.server"
import { deliverPlayerAction } from "../awen/lib/submit-action.server"
import { PlayerActionInputSchema } from "../awen/lib/submit-player-action"
import type { Route } from "./+types/api.action"

const CORS_METHODS = "POST, OPTIONS"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }
  return Response.json({ ok: false, error: "Method not allowed" }, { status: 405, headers: cors })
}

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  const { user, headers } = await resolveRequestUser(request)
  if (user === null) {
    return Response.json(
      { ok: false, error: "Not authenticated." },
      { status: 401, headers: withCors(headers, cors) }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json(
      { ok: false, error: "Please enter an action." },
      { status: 400, headers: withCors(headers, cors) }
    )
  }
  const parsed = PlayerActionInputSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please enter an action." },
      { status: 400, headers: withCors(headers, cors) }
    )
  }
  const game = await loadGame(parsed.data.gameExternalId)
  if (game === null) {
    return Response.json(
      { ok: false, error: "Game not found." },
      { status: 404, headers: withCors(headers, cors) }
    )
  }
  if (game.coordinatorAgent === null) {
    return Response.json(
      { ok: false, error: "No coordinator is listening for this game right now." },
      { status: 400, headers: withCors(headers, cors) }
    )
  }
  try {
    await deliverPlayerAction(parsed.data.text, game.coordinatorAgent, {
      accountUserId: user.id,
      personSlug: null,
    })
  } catch {
    return Response.json(
      { ok: false, error: "The game is not listening right now. Try again." },
      { status: 503, headers: withCors(headers, cors) }
    )
  }
  return Response.json({ ok: true }, { headers: withCors(headers, cors) })
}
