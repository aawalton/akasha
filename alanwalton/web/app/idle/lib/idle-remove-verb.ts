import { type ActionVerbContext, registerActionVerb } from "@shared/pages-ui/action-verbs/action-verb-registry"
import { z } from "zod"
import { IDLE_REMOVE_VERB_ID } from "~/idle/lib/idle-card-page-type"
import { idleGameStore } from "~/idle/lib/idle-game-store"
import { removeFromTeam } from "~/idle/lib/lineup-slots-draft"

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
