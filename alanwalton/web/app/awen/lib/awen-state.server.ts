import type { GameState } from "@alanwalton/awen-core/state-schema"
import { askComposed } from "@shared/pages-query/ask"
import { parseAwenStatePage } from "./awen-state-parse"
import type { AwenGameConfig } from "./game.server"

const AWEN_STATE_SLUG = "game-state"

export async function loadLatestState(game: AwenGameConfig): Promise<GameState | null> {
  if (game.stateIds.length === 0) return null
  const asked = await askComposed({
    "page-type": AWEN_STATE_SLUG,
    where: { id: { in: game.stateIds } },
    keys: ["turn", "hud", "revealed", "build", "log", "chapters", "quests"],
    "sort-by": "turn",
    descending: true,
    limit: 1,
  })
  if (!asked.ok) throw new Error(`loadLatestState: ${asked.why}`)
  const latest = asked.answer.rows[0]
  if (latest === undefined) return null
  return parseAwenStatePage({
    turn: latest.values.turn,
    hud: latest.values.hud,
    revealed: latest.values.revealed,
    build: latest.values.build,
    log: latest.values.log,
    chapters: latest.values.chapters,
    quests: latest.values.quests,
  })
}
