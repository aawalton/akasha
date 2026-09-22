import type { Page } from "akasha/page/page.page-type.types.ts"
import type { HoldingGame } from "akasha/story/game/properties/holding-game.relation-property.types.ts"
import type { SystemWindow } from "akasha/story/game/turn/properties/system-window.record-property.types.ts"
import type { TurnDerived } from "akasha/story/game/turn/properties/turn-derived.record-property.types.ts"
import type { TurnNumber } from "akasha/story/game/turn/properties/turn-number.number-property.types.ts"
import type { TurnPools } from "akasha/story/game/turn/properties/turn-pools.record-property.types.ts"
import type { TurnRungs } from "akasha/story/game/turn/properties/turn-rungs.record-property.types.ts"

export type GameTurn = Page & {
  game: HoldingGame
  number: TurnNumber
  windows?: SystemWindow
  pools?: TurnPools
  derived?: TurnDerived
  rungs?: TurnRungs
}
