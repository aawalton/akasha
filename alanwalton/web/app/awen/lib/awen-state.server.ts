import type { GameState } from "@akasha/story-engine-core/state-schema"
import { unheld } from "~/lib/pages-unheld"
import type { AwenGameConfig } from "./game.server"

const AWEN_STATE_SLUG = "game-state"

// `game-state` is no page type the pages system service holds, so the latest state of a game
// cannot be read. Nothing reaches here in practice — `loadGame` refuses before a caller has an
// `AwenGameConfig` to hand over — but a `null` returned from here would say the game had never
// been played rather than that its states went unread, so this refuses in its own right.
export async function loadLatestState(game: AwenGameConfig): Promise<GameState | null> {
  throw new Error(unheld(AWEN_STATE_SLUG, `the latest state of \`${game.externalId}\``))
}
