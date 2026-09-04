import { resolveDrawContext } from "../.server/gacha-draw-context/gacha-draw-context.module.code.ts"
import { resolveIdleSaveContext } from "../.server/idle-save-context/idle-save-context.module.code.ts"

export async function loader({ request }: { request: Request }): Promise<Response> {
  const ctx = await resolveIdleSaveContext(request)
  if (!ctx.authenticated) {
    return Response.json({ error: "unauthorized" }, { status: 401, headers: ctx.headers })
  }
  const { roster, pools } = await resolveDrawContext(ctx.supabase, Date.now())
  return Response.json({ roster, pools }, { headers: ctx.headers })
}
