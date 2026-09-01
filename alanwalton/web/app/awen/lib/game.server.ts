import type { ResolvedGameDisplay } from "@akasha/story-engine-core/game-schema"
import { unheld } from "~/lib/pages-unheld"

const AWEN_GAME_SLUG = "game"

export interface AwenGameConfig {
  readonly externalId: string
  readonly title: string
  readonly display: ResolvedGameDisplay
  readonly coordinatorAgent: string | null
  readonly mechanicsWeight?: string
  readonly currentSession: number
  readonly stateIds: readonly string[]
  readonly turnIds: readonly string[]
}

// AWEN IS GONE UNTIL `game` STANDS IN AKASHA. This read a `game` page — its display config, its
// coordinator, its session number and the ids of every turn and state hanging off it — from
// `@shared/pages-query`, which asked this pod's own checkout. That reach is severed, and the
// pages system service that replaced it answers for the page types the akasha index files. `game`
// is not among them, so there is no game to load and nothing here to migrate onto.
//
// A GAME THAT WENT UNREAD IS NOT A GAME THAT IS NOT THERE. This returned `null` for a game the
// query matched nothing for, and every caller draws that as a 404. Keeping the `null` would tell
// a reader their game had been deleted. Throwing says the true thing: the shelf cannot be reached.
// Async so the refusal arrives as a rejected promise, which is where every caller already looks
// for a failure — a synchronous throw would walk straight past their `await`'s catch.
export async function loadGame(externalId: string): Promise<AwenGameConfig | null> {
  throw new Error(unheld(AWEN_GAME_SLUG, `the game \`${externalId}\``))
}
