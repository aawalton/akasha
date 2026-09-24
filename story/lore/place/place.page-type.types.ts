import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"
import type { PlaceDepth } from "akasha/story/lore/place/properties/place-depth.number-property.types.ts"
import type { PlaceExits } from "akasha/story/lore/place/properties/place-exits.record-property.types.ts"
import type { PlaceWithin } from "akasha/story/lore/place/properties/place-within.relation-property.types.ts"

export type Place = Lore & {
  within?: PlaceWithin
  depth?: PlaceDepth
  exits?: PlaceExits
}
