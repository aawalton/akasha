import { formatShortNumber as fmt } from "@akasha/pages-core/property-types/number"
import {
  type ActionPresentation,
  type ActionVerbContext,
  registerActionVerb,
} from "@akasha/pages-ui/action-verbs/action-verb-registry"
import { z } from "zod"
import {
  IDLE_LOCK_STATE_UNLOCKED,
  IDLE_TRAINMAX_VERB_ID,
} from "../idle-card-page-type/idle-card-page-type.module.code.ts"
import { idleGameStore } from "../idle-game-store/idle-game-store.module.code.ts"

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
