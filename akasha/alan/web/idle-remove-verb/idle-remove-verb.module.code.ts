import {
  type ActionVerbContext,
  registerActionVerb,
} from "@akasha/pages-ui/action-verbs/action-verb-registry"
import { z } from "zod"
import { IDLE_REMOVE_VERB_ID } from "../idle-card-page-type/idle-card-page-type.module.code.ts"
import { idleGameStore } from "../idle-game-store/idle-game-store.module.code.ts"
import { removeFromTeam } from "../lineup-slots-draft/lineup-slots-draft.module.code.ts"

const removeCardSchema = z.object({ cardSlug: z.string().min(1) }).partial()

export function removeFromCard(ctx: ActionVerbContext): undefined {
  const parsed = removeCardSchema.safeParse(ctx.data)
  if (!parsed.success || parsed.data.cardSlug === undefined) return
  const cardSlug = parsed.data.cardSlug

  const team = idleGameStore.getSnapshot().state?.activeTeam ?? []
  const next = removeFromTeam(team, cardSlug)
  if (next === team) return
  idleGameStore.dispatch({ type: "team", members: [...next] })
}

registerActionVerb(IDLE_REMOVE_VERB_ID, removeFromCard)
