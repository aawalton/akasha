import { bankAccrual, normalizeGameState, withLatches } from "../idle/lib/core/accrual"
import { applyDerivedMechanics } from "../idle/lib/core/derive"
import { applyDraw } from "../idle/lib/core/gacha/draw"
import { resolveDrawContext } from "~/idle/lib/gacha-draw-context.server"
import { drawIntentSchema } from "~/idle/lib/idle-actions"
import { reprojectUserCardsSafely } from "~/idle/lib/idle-card-projection.server"
import { parseIdleSave } from "~/idle/lib/idle-save"
import { resolveIdleSaveContext } from "~/idle/lib/idle-save-context.server"
import { loadSave, upsertSave } from "~/idle/lib/idle-saves.server"
import { capacitorCorsHeaders, withCors } from "~/lib/capacitor-cors"
import type { Route } from "./+types/api.save"

const CORS_METHODS = "POST, OPTIONS"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: capacitorCorsHeaders(request, CORS_METHODS) })
  }
  return Response.json(
    { error: "method not allowed" },
    { status: 405, headers: capacitorCorsHeaders(request, CORS_METHODS) }
  )
}

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method !== "POST") {
    return Response.json({ error: "method not allowed" }, { status: 405, headers: cors })
  }
  const ctx = await resolveIdleSaveContext(request)
  if (!ctx.authenticated) {
    return Response.json(
      { error: "unauthorized" },
      { status: 401, headers: withCors(ctx.headers, cors) }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json(
      { error: "invalid body" },
      { status: 422, headers: withCors(ctx.headers, cors) }
    )
  }

  if (drawIntentSchema.safeParse(body).success) {
    const current = await loadSave(ctx.userId)
    if (current === null) {
      return Response.json(
        { error: "no save" },
        { status: 409, headers: withCors(ctx.headers, cors) }
      )
    }
    const now = Date.now()
    const banked = withLatches(bankAccrual(normalizeGameState(current), now))
    const drawCtx = await resolveDrawContext(ctx.supabase, now)
    const primed =
      drawCtx.roster.length > 0 ? applyDerivedMechanics(banked, drawCtx.mechanics) : banked
    const { state, outcome, reveal } = applyDraw(primed, drawCtx)
    const latched = withLatches(state)
    const save = parseIdleSave(latched)
    await upsertSave(ctx.userId, save, { isDevTestWrite: ctx.devTestUser === true })
    if (outcome.applied) {
      await reprojectUserCardsSafely(ctx.supabase, {
        userId: ctx.userId,
        state: latched,
        now,
        catalog: { roster: drawCtx.roster, pools: drawCtx.pools },
      })
    }
    return Response.json(
      { ok: true, outcome, save, reveal },
      { headers: withCors(ctx.headers, cors) }
    )
  }

  let save: ReturnType<typeof parseIdleSave>
  try {
    save = parseIdleSave(body)
  } catch {
    return Response.json(
      { error: "invalid save" },
      { status: 422, headers: withCors(ctx.headers, cors) }
    )
  }
  await upsertSave(ctx.userId, save, { isDevTestWrite: ctx.devTestUser === true })
  await reprojectUserCardsSafely(ctx.supabase, {
    userId: ctx.userId,
    state: normalizeGameState(save),
    now: Date.now(),
  })
  return Response.json({ ok: true }, { headers: withCors(ctx.headers, cors) })
}
