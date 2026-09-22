import type { Page } from "akasha/page/page.page-type.types.ts"
import type { HoldingGame } from "akasha/story/game/properties/holding-game.relation-property.types.ts"

export type GameTurn = Page & {
  game: HoldingGame
}
