import { type ActionPresentation, type ActionVerbContext, registerActionVerb } from "@shared/pages-ui/action-verbs/action-verb-registry"
import { z } from "zod"
import { formatShortNumber as fmt } from "@shared/pages-core/property-types/number"
import { IDLE_LOCK_STATE_UNLOCKED, IDLE_TRAIN10_VERB_ID } from "~/idle/lib/idle-card-page-type"
import { idleGameStore } from "~/idle/lib/idle-game-store"

const train10CardSchema = z.object({
  cardSlug: z.string().min(1),
  lockState: z.string(),
})

export function train10FromCard(ctx: ActionVerbContext): undefined {
  const parsed = train10CardSchema.safeParse(ctx.data)
  if (!parsed.success) return
  const { cardSlug, lockState } = parsed.data
  if (lockState !== IDLE_LOCK_STATE_UNLOCKED) return
  idleGameStore.dispatch({ type: "train10", slug: cardSlug })
}

const train10PresentationSchema = z.object({
  train10Cost: z.number(),
  train10Affordable: z.boolean(),
  lockState: z.string(),
})

export function train10Presentation(ctx: ActionVerbContext): ActionPresentation {
  const parsed = train10PresentationSchema.safeParse(ctx.data)
  if (!parsed.success) return {}
  const { train10Cost, train10Affordable, lockState } = parsed.data
  const buyable = lockState === IDLE_LOCK_STATE_UNLOCKED && train10Affordable
  return { label: `+10 (${fmt(train10Cost)})`, disabled: !buyable }
}

registerActionVerb(IDLE_TRAIN10_VERB_ID, train10FromCard, train10Presentation)
