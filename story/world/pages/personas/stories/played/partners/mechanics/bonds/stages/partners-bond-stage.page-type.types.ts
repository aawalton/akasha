import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"
import type { PartnersBondStagePoints } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/bonds/stages/properties/partners-bond-stage-points.number-property.types.ts"

export type PartnersBondStage = WorldRank & {
  points?: PartnersBondStagePoints
}
