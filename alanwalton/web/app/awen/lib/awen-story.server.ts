import { unheld } from "~/lib/pages-unheld"
import type { AwenGameConfig } from "./game.server"
import type { StoryLedger } from "./session-envelope"

const AWEN_TURN_SLUG = "game-turn"

// `game-turn` is no page type the pages system service holds, so the turns a game is made of
// cannot be read, and neither can the ledger composed over them. Nothing reaches here in
// practice — `loadGame` refuses first — but a `null` returned from here would draw a game with no
// story told in it rather than a story that went unread.
export async function loadStoryLedger(game: AwenGameConfig): Promise<StoryLedger | null> {
  throw new Error(unheld(AWEN_TURN_SLUG, `the turns of \`${game.externalId}\``))
}
