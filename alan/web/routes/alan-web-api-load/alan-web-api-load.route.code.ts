import { resolveIdleSaveContext } from "akasha/alan/web/.server/idle-save-context/idle-save-context.module.code.ts"
import { loadSave } from "akasha/alan/web/.server/idle-saves/idle-saves.module.code.ts"
import {
  capacitorCorsHeaders,
  withCors,
} from "akasha/alan/web/modules/capacitor-cors/capacitor-cors.module.code.ts"

const CORS_METHODS = "GET, OPTIONS"

export async function loader({ request }: { request: Request }): Promise<Response> {
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
