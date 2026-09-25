import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { LocationExitTo } from "akasha/story/game/game-location/properties/location-exit-to.relation-property.types.ts"
import type { LocationExitWay } from "akasha/story/game/game-location/properties/location-exit-way.text-property.types.ts"

export type LocationExits = List<{
  to?: LocationExitTo
  way: LocationExitWay
}>
