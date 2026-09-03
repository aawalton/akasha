import { z } from "zod"
import { apiFetch } from "../api-fetch/api-fetch.module.code.ts"
import { idleGameStore } from "../idle-game-store/idle-game-store.module.code.ts"
import { pushReveal } from "../idle-reveal-store/idle-reveal-store.module.code.ts"

const drawRevealSchema = z.object({
  slug: z.string(),
  name: z.string(),
  image: z.string(),
  isNewImage: z.boolean(),
  isNewGirl: z.boolean(),
  stars: z.number(),
  starUp: z.boolean(),
})
const drawResponseSchema = z.looseObject({
  outcome: z.looseObject({ applied: z.boolean() }),
  reveal: drawRevealSchema.nullish(),
  save: z.unknown(),
})

let inflight = false

export async function runDraw(): Promise<void> {
  if (inflight) return
  inflight = true
  try {
    await idleGameStore.flushPersist()
    const res = await apiFetch("/api/save", {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ type: "draw" }),
    })
    if (!res.ok) return
    const json: unknown = await res.json()
    const parsed = drawResponseSchema.safeParse(json)
    if (!parsed.success) return
    const { outcome, reveal, save } = parsed.data
    if (outcome.applied) {
      if (save !== null && save !== undefined) idleGameStore.adoptServerSave(save)
      if (reveal !== null && reveal !== undefined) pushReveal(reveal)
    }
  } catch {
  } finally {
    inflight = false
  }
}
