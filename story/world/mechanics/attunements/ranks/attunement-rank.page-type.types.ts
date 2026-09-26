import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { AttunementRankCap } from "akasha/story/world/mechanics/attunements/ranks/properties/attunement-rank-cap.number-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type AttunementRank = WorldMechanic & {
  title: Title
  cap: AttunementRankCap
}
