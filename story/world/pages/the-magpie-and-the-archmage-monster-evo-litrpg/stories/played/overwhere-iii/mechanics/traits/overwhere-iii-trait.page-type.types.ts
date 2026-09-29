import type { WorldTrait } from "akasha/story/world/mechanics/traits/world-trait.page-type.types.ts"
import type { OverwhereIiiTraitDraw } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/properties/overwhere-iii-trait-draw.number-property.types.ts"
import type { OverwhereIiiTraitNodeFactor } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/properties/overwhere-iii-trait-node-factor.number-property.types.ts"
import type { OverwhereIiiTraitRankUses } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/properties/overwhere-iii-trait-rank-uses.number-property.types.ts"
import type { OverwhereIiiTraitRanks } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/properties/overwhere-iii-trait-ranks.text-property.types.ts"
import type { OverwhereIiiTraitReachFeet } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/properties/overwhere-iii-trait-reach-feet.number-property.types.ts"
import type { OverwhereIiiTraitStrain } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/properties/overwhere-iii-trait-strain.number-property.types.ts"

export type OverwhereIiiTrait = WorldTrait & {
  ranks: OverwhereIiiTraitRanks
  draw?: OverwhereIiiTraitDraw
  reachFeet?: OverwhereIiiTraitReachFeet
  strain?: OverwhereIiiTraitStrain
  rankUses?: OverwhereIiiTraitRankUses
  nodeFactor?: OverwhereIiiTraitNodeFactor
}
