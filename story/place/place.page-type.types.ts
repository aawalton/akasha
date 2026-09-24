import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { PlaceDepth } from "akasha/story/place/properties/place-depth.number-property.types.ts"
import type { PlaceExits } from "akasha/story/place/properties/place-exits.record-property.types.ts"
import type { PlaceWithin } from "akasha/story/place/properties/place-within.relation-property.types.ts"
import type { World } from "akasha/story/world/stories/played/properties/world.relation-property.types.ts"

export type Place = Page & {
  title: Title
  world: World
  within?: PlaceWithin
  depth?: PlaceDepth
  exits?: PlaceExits
}
