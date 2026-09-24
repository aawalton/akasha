import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { PlaceExitTo } from "akasha/story/place/properties/place-exit-to.relation-property.types.ts"
import type { PlaceExitWay } from "akasha/story/place/properties/place-exit-way.text-property.types.ts"

export type PlaceExits = List<{
  to?: PlaceExitTo
  way: PlaceExitWay
}>
