import { resolveDrawContext } from "~/idle/lib/gacha-draw-context.server"
import { resolveIdleSaveContext } from "~/idle/lib/idle-save-context.server"

export async function loader({ request }: { request: Request }): Promise<Response> {
  const ctx = await resolveIdleSaveContext(request)
  if (!ctx.authenticated) {
    return Response.json({ error: "unauthorized" }, { status: 401, headers: ctx.headers })
  }
  const { roster, pools } = await resolveDrawContext(ctx.supabase, Date.now())
  return Response.json({ roster, pools }, { headers: ctx.headers })
}
