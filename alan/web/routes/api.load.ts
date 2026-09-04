import { resolveIdleSaveContext } from "../.server/idle-save-context/idle-save-context.module.code.ts"
import { loadSave } from "../.server/idle-saves/idle-saves.module.code.ts"
import { capacitorCorsHeaders, withCors } from "../capacitor-cors/capacitor-cors.module.code.ts"
import type { Route } from "./+types/api.load"

const CORS_METHODS = "GET, OPTIONS"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }
  const ctx = await resolveIdleSaveContext(request)
  if (!ctx.authenticated) {
    return Response.json(
      { error: "unauthorized" },
      { status: 401, headers: withCors(ctx.headers, cors) }
    )
  }
  const save = await loadSave(ctx.userId)
  return Response.json({ save }, { headers: withCors(ctx.headers, cors) })
}
