import { formatShortNumber as fmt } from "@akasha/pages-core/property-types/number"
import {
  type ActionPresentation,
  type ActionVerbContext,
  registerActionVerb,
} from "@akasha/pages-ui/action-verbs/action-verb-registry"
import { z } from "zod"
import {
  IDLE_LOCK_STATE_UNLOCKED,
  IDLE_TRAIN_VERB_ID,
} from "../idle-card-page-type/idle-card-page-type.module.code.ts"
import { idleGameStore } from "../idle-game-store/idle-game-store.module.code.ts"

const trainCardSchema = z.object({
  cardSlug: z.string().min(1),
  lockState: z.string(),
})

export function trainFromCard(ctx: ActionVerbContext): undefined {
  const parsed = trainCardSchema.safeParse(ctx.data)
  if (!parsed.success) return
  const { cardSlug, lockState } = parsed.data
  if (lockState !== IDLE_LOCK_STATE_UNLOCKED) return
  idleGameStore.dispatch({ type: "train", slug: cardSlug })
}

const trainPresentationSchema = z.object({ trainCost: z.number() })

export function trainPresentation(ctx: ActionVerbContext): ActionPresentation {
  const parsed = trainPresentationSchema.safeParse(ctx.data)
  if (!parsed.success) return {}
  return { label: `Train (${fmt(parsed.data.trainCost)})` }
}

registerActionVerb(IDLE_TRAIN_VERB_ID, trainFromCard, trainPresentation)
