import type { Page } from "akasha/page/page.page-type.types.ts"
import type { HoldingGame } from "akasha/story/game/properties/holding-game.relation-property.types.ts"
import type { SystemWindow } from "akasha/story/game/turn/properties/system-window.record-property.types.ts"
import type { TurnNumber } from "akasha/story/game/turn/properties/turn-number.number-property.types.ts"
import type { TurnSession } from "akasha/story/game/turn/properties/turn-session.number-property.types.ts"

export type GameTurn = Page & {
  game: HoldingGame
  number: TurnNumber
  session?: TurnSession
  windows?: SystemWindow
}
