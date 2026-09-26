import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { WorldRankPlace } from "akasha/story/world/mechanics/ranks/properties/world-rank-place.number-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type WorldRank = WorldMechanic & {
  title: Title
  place: WorldRankPlace
}
