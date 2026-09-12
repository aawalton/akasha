import {
  IDLE_LOCK_STATE_UNLOCKED,
  IDLE_TRAIN_VERB_ID,
} from "akasha/alan/web/idle-card-page-type/idle-card-page-type.module.code.ts"
import { idleGameStore } from "akasha/alan/web/idle-game-store/idle-game-store.module.code.ts"
import { formatShortNumber as fmt } from "akasha/pages/core/property-types/number/number.module.code.ts"
import {
  type ActionPresentation,
  type ActionVerbContext,
  registerActionVerb,
} from "akasha/pages/ui/action-verbs/modules/action-verb-registry/action-verb-registry.module.code.ts"
import { z } from "zod"

const trainCardSchema = z.object({
  cardSlug: z.string().min(1),
  lockState: z.string(),
})

function trainFromCard(ctx: ActionVerbContext): undefined {
  const parsed = trainCardSchema.safeParse(ctx.data)
  if (!parsed.success) return
  const { cardSlug, lockState } = parsed.data
  if (lockState !== IDLE_LOCK_STATE_UNLOCKED) return
  idleGameStore.dispatch({ type: "train", slug: cardSlug })
}

const trainPresentationSchema = z.object({ trainCost: z.number() })

function trainPresentation(ctx: ActionVerbContext): ActionPresentation {
  const parsed = trainPresentationSchema.safeParse(ctx.data)
  if (!parsed.success) return {}
  return { label: `Train (${fmt(parsed.data.trainCost)})` }
}

registerActionVerb(IDLE_TRAIN_VERB_ID, trainFromCard, trainPresentation)
