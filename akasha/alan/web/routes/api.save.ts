import { bankAccrual, normalizeGameState, withLatches } from "@akasha/idle-system/accrual"
import { applyDerivedMechanics } from "@akasha/idle-system/deriving"
import { applyDraw } from "@akasha/idle-system/draw"
import { parseIdleSave } from "@akasha/idle-system/save"
import { resolveDrawContext } from "../.server/gacha-draw-context/gacha-draw-context.module.code.ts"
import { reprojectUserCardsSafely } from "../.server/idle-card-projecting/idle-card-projecting.module.code.ts"
import { resolveIdleSaveContext } from "../.server/idle-save-context/idle-save-context.module.code.ts"
import { loadSave, upsertSave } from "../.server/idle-saves/idle-saves.module.code.ts"
import { capacitorCorsHeaders, withCors } from "../capacitor-cors/capacitor-cors.module.code.ts"
import { drawIntentSchema } from "../idle-actions/idle-actions.module.code.ts"
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
