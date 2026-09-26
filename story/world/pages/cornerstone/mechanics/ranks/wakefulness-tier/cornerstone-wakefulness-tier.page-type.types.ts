import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"
import type { CornerstoneWakefulnessTierThreshold } from "akasha/story/world/pages/cornerstone/mechanics/ranks/wakefulness-tier/properties/cornerstone-wakefulness-tier-threshold.number-property.types.ts"

export type CornerstoneWakefulnessTier = WorldRank & {
  threshold: CornerstoneWakefulnessTierThreshold
}
