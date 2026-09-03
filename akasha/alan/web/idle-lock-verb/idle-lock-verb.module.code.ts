import {
  type ActionPresentation,
  type ActionVerbContext,
  registerActionVerb,
} from "@akasha/pages-ui/action-verbs/action-verb-registry"
import { z } from "zod"
import { IDLE_LOCK_VERB_ID } from "../idle-card-page-type/idle-card-page-type.module.code.ts"
import { idleGameStore } from "../idle-game-store/idle-game-store.module.code.ts"

const lockCardSchema = z
  .object({
    cardSlug: z.string().min(1),
    specializeLocked: z.boolean(),
    lockEligible: z.boolean(),
  })
  .partial()

export function lockPresentation(ctx: ActionVerbContext): ActionPresentation {
  const parsed = lockCardSchema.safeParse(ctx.data)
  const locked = parsed.success && parsed.data.specializeLocked === true
  const eligible = parsed.success && parsed.data.lockEligible === true
  return {
    disabled: !eligible,
    label: locked ? "Unlock" : "Lock",
    icon: locked ? "lock-open" : "lock",
  }
}

export function lockFromCard(ctx: ActionVerbContext): undefined {
  const parsed = lockCardSchema.safeParse(ctx.data)
  if (!parsed.success || parsed.data.cardSlug === undefined) return
  const { cardSlug, specializeLocked, lockEligible } = parsed.data
  if (lockEligible !== true) return
  const type = specializeLocked === true ? "unspecialize" : "specialize"
  idleGameStore.dispatch({ type, slug: cardSlug })
}

registerActionVerb(IDLE_LOCK_VERB_ID, lockFromCard, lockPresentation)
