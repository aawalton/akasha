import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { LocationConditions } from "akasha/story/game/location/properties/location-conditions.record-property.types.ts"
import type { LocationDepth } from "akasha/story/game/location/properties/location-depth.number-property.types.ts"
import type { LocationDescription } from "akasha/story/game/location/properties/location-description.text-property.types.ts"
import type { LocationExhausted } from "akasha/story/game/location/properties/location-exhausted.boolean-property.types.ts"
import type { LocationExits } from "akasha/story/game/location/properties/location-exits.text-property.types.ts"
import type { LocationTheme } from "akasha/story/game/location/properties/location-theme.text-property.types.ts"
import type { WithinLocation } from "akasha/story/game/location/properties/within-location.relation-property.types.ts"
import type { HoldingGame } from "akasha/story/game/properties/holding-game.relation-property.types.ts"
import type { ListedNote } from "akasha/story/game/properties/listed-note.text-property.types.ts"

export type GameLocation = Page & {
  title: Title
  game: HoldingGame
  within?: WithinLocation
  depth?: LocationDepth
  theme?: LocationTheme
  description?: LocationDescription
  exits?: LocationExits
  exhausted?: LocationExhausted
  conditions?: LocationConditions
  note?: ListedNote
}
