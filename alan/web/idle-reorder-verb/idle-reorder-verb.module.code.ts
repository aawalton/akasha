import {
  type ReorderVerbContext,
  registerReorderVerb,
} from "@akasha/pages-ui/reorder-verbs/reorder-verb-registry"
import { idleGameStore } from "../idle-game-store/idle-game-store.module.code.ts"
import { IDLE_REORDER_VERB_ID } from "../idle-lineup-view-config/idle-lineup-view-config.module.code.ts"
import { reorderTeam } from "../lineup-slots-draft/lineup-slots-draft.module.code.ts"

export function reorderLineup(ctx: ReorderVerbContext): undefined {
  const team = idleGameStore.getSnapshot().state?.activeTeam ?? []
  const next = reorderTeam(team, ctx.fromIndex, ctx.toIndex)
  if (next === team) return
  idleGameStore.dispatch({ type: "team", members: [...next] })
}

registerReorderVerb(IDLE_REORDER_VERB_ID, reorderLineup)
