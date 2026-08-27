import { type ReorderVerbContext, registerReorderVerb } from "@shared/pages-ui/reorder-verbs/reorder-verb-registry"
import { idleGameStore } from "~/idle/lib/idle-game-store"
import { IDLE_REORDER_VERB_ID } from "~/idle/lib/idle-lineup-view-config"
import { reorderTeam } from "~/idle/lib/lineup-slots-draft"

export function reorderLineup(ctx: ReorderVerbContext): undefined {
  const team = idleGameStore.getSnapshot().state?.activeTeam ?? []
  const next = reorderTeam(team, ctx.fromIndex, ctx.toIndex)
  if (next === team) return
  idleGameStore.dispatch({ type: "team", members: [...next] })
}

registerReorderVerb(IDLE_REORDER_VERB_ID, reorderLineup)
