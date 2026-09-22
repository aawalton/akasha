import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { RunFollows } from "akasha/story/game/mechanic-run/properties/run-follows.text-property.types.ts"
import type { RunMechanic } from "akasha/story/game/mechanic-run/properties/run-mechanic.relation-property.types.ts"
import type { RunSaid } from "akasha/story/game/mechanic-run/properties/run-said.text-property.types.ts"
import type { RunSeed } from "akasha/story/game/mechanic-run/properties/run-seed.text-property.types.ts"
import type { RunWorkings } from "akasha/story/game/mechanic-run/properties/run-workings.file-property.types.ts"
import type { HoldingGame } from "akasha/story/game/properties/holding-game.relation-property.types.ts"
import type { SourceTurn } from "akasha/story/game/properties/source-turn.number-property.types.ts"

export type GameMechanicRun = Page & {
  title: Title
  game: HoldingGame
  turn: SourceTurn
  mechanic?: RunMechanic
  said?: RunSaid
  seed?: RunSeed
  follows?: RunFollows
  workings: RunWorkings
}
