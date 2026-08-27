import { type ActionPresentation, type ActionVerbContext, registerActionVerb } from "@shared/pages-ui/action-verbs/action-verb-registry"
import { z } from "zod"
import { formatShortNumber as fmt } from "@shared/pages-core/property-types/number"
import { IDLE_LOCK_STATE_UNLOCKED, IDLE_TRAINMAX_VERB_ID } from "~/idle/lib/idle-card-page-type"
import { idleGameStore } from "~/idle/lib/idle-game-store"

const trainMaxCardSchema = z.object({
  cardSlug: z.string().min(1),
  lockState: z.string(),
})

export function trainMaxFromCard(ctx: ActionVerbContext): undefined {
  const parsed = trainMaxCardSchema.safeParse(ctx.data)
  if (!parsed.success) return
  const { cardSlug, lockState } = parsed.data
  if (lockState !== IDLE_LOCK_STATE_UNLOCKED) return
  idleGameStore.dispatch({ type: "trainMax", slug: cardSlug })
}

const trainMaxPresentationSchema = z.object({
  trainMaxCount: z.number(),
  trainMaxCost: z.number(),
  lockState: z.string(),
})

export function trainMaxPresentation(ctx: ActionVerbContext): ActionPresentation {
  const parsed = trainMaxPresentationSchema.safeParse(ctx.data)
  if (!parsed.success) return {}
  const { trainMaxCount, trainMaxCost, lockState } = parsed.data
  const buyable = lockState === IDLE_LOCK_STATE_UNLOCKED && trainMaxCount > 0
  const label = trainMaxCount > 0 ? `Max ${trainMaxCount} (${fmt(trainMaxCost)})` : "Max"
  return { label, disabled: !buyable }
}

registerActionVerb(IDLE_TRAINMAX_VERB_ID, trainMaxFromCard, trainMaxPresentation)
