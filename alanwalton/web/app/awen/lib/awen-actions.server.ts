import { pendingActions } from "@alanwalton/awen-core/action-box"
import { askComposed } from "@shared/pages-query/ask"
import type { PendingActionInput } from "./client-envelope"
import type { AwenGameConfig } from "./game.server"
import { latestFrontierMs } from "./revealed-frontier"
import { PUBLISHED_TURN_STATUSES } from "./story-session-compose"

const AWEN_TURN_SLUG = "game-turn"
const AWEN_STATE_SLUG = "game-state"

export interface ActionInputs {
  readonly actions: readonly PendingActionInput[]
  readonly latestTurnAt: number | null
  readonly latestStateAt: number | null
}

async function loadLatestTurnAt(game: AwenGameConfig): Promise<number | null> {
  if (game.turnIds.length === 0) return null
  const asked = await askComposed({
    "page-type": AWEN_TURN_SLUG,
    where: {
      id: { in: game.turnIds },
      status: { in: [...PUBLISHED_TURN_STATUSES] },
    },
    keys: ["published-at"],
  })
  if (!asked.ok) throw new Error(`loadLatestTurnAt: ${asked.why}`)
  const rows = asked.answer.rows.map((r) => ({ publishedAt: r.values["published-at"] }))
  return latestFrontierMs(rows, "publishedAt", "createdAt")
}

async function loadLatestStateAt(game: AwenGameConfig): Promise<number | null> {
  if (game.stateIds.length === 0) return null
  const asked = await askComposed({
    "page-type": AWEN_STATE_SLUG,
    where: { id: { in: game.stateIds } },
    keys: ["revealed-at"],
  })
  if (!asked.ok) throw new Error(`loadLatestStateAt: ${asked.why}`)
  const rows = asked.answer.rows.map((r) => ({ revealedAt: r.values["revealed-at"] }))
  return latestFrontierMs(rows, "revealedAt", "createdAt")
}

export async function loadActionInputs(game: AwenGameConfig): Promise<ActionInputs> {
  const [actions, latestTurnAt, latestStateAt] = await Promise.all([
    loadActionMessages(),
    loadLatestTurnAt(game),
    loadLatestStateAt(game),
  ])
  return { actions, latestTurnAt, latestStateAt }
}

function loadActionMessages(): readonly PendingActionInput[] {
  return pendingActions()
}
