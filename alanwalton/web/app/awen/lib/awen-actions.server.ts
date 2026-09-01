import { unheld } from "~/lib/pages-unheld"
import type { PendingActionInput } from "./client-envelope"
import type { AwenGameConfig } from "./game.server"

const AWEN_TURN_SLUG = "game-turn"

export interface ActionInputs {
  readonly actions: readonly PendingActionInput[]
  readonly latestTurnAt: number | null
  readonly latestStateAt: number | null
}

// The pending actions come out of the action box and are readable still, but the two frontiers
// beside them — the latest published turn and the latest revealed state — are read off
// `game-turn` and `game-state`, and the pages system service holds neither page type. `null` is
// what this answers for a game with no turns at all, so answering `null` here would tell the
// reader nothing had ever happened in their game rather than that the frontier went unread.
export async function loadActionInputs(game: AwenGameConfig): Promise<ActionInputs> {
  throw new Error(unheld(AWEN_TURN_SLUG, `the frontier of \`${game.externalId}\``))
}
