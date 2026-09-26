import type { AttunementRankCap } from "akasha/story/world/mechanics/attunements/ranks/properties/attunement-rank-cap.number-property.types.ts"
import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export type AttunementRank = WorldRank & {
  cap: AttunementRankCap
}
