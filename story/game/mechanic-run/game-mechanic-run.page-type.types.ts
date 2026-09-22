import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { HoldingGame } from "akasha/story/game/properties/holding-game.relation-property.types.ts"
import type { SourceTurn } from "akasha/story/game/properties/source-turn.number-property.types.ts"

export type GameMechanicRun = Page & {
  title: Title
  game: HoldingGame
  turn: SourceTurn
}
