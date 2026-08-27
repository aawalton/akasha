import type { AwenDisplayProps } from "../awen/components/awen-display"
import { loadSessionEnvelope } from "../awen/lib/awen-session.server"
import { loadGame } from "../awen/lib/game.server"
import type { Route } from "./+types/api.awen-game.$externalId"

const CAPACITOR_ORIGIN = "capacitor://localhost"

function corsHeaders(request: Request): Record<string, string> {
  return request.headers.get("Origin") === CAPACITOR_ORIGIN
    ? {
        "Access-Control-Allow-Origin": CAPACITOR_ORIGIN,
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      }
    : {}
}

export async function loader({ params, request }: Route.LoaderArgs): Promise<Response> {
  const cors = corsHeaders(request)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }
  const game = await loadGame(params.externalId)
  if (game === null) {
    return Response.json({ error: "Game not found." }, { status: 404, headers: cors })
  }
  const props: AwenDisplayProps = {
    game: {
      externalId: game.externalId,
      title: game.title,
      display: game.display,
    },
    initialEnvelope: await loadSessionEnvelope(game),
  }
  return Response.json(props, { headers: cors })
}
