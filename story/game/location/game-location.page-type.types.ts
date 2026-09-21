import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { LocationDepth } from "akasha/story/game/location/properties/location-depth.number-property.types.ts"
import type { WithinLocation } from "akasha/story/game/location/properties/within-location.relation-property.types.ts"
import type { HoldingGame } from "akasha/story/game/properties/holding-game.relation-property.types.ts"

export type GameLocation = Page & {
  title: Title
  game: HoldingGame
  within?: WithinLocation
  depth?: LocationDepth
}
