import { z } from "zod"
import { idleGameStore } from "~/idle/lib/idle-game-store"
import { pushReveal } from "~/idle/lib/reveal-store"
import { apiFetch } from "~/lib/api-fetch"

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
