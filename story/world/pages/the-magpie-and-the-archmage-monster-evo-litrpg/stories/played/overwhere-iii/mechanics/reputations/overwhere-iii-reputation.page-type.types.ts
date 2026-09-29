import type { WorldReputation } from "akasha/story/world/mechanics/reputations/world-reputation.page-type.types.ts"
import type { OverwhereIiiReputationCharacter } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/reputations/properties/overwhere-iii-reputation-character.relation-property.types.ts"
import type { OverwhereIiiReputationPlace } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/reputations/properties/overwhere-iii-reputation-place.relation-property.types.ts"
import type { OverwhereIiiReputationRenown } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/reputations/properties/overwhere-iii-reputation-renown.number-property.types.ts"

export type OverwhereIiiReputation = WorldReputation & {
  character: OverwhereIiiReputationCharacter
  place: OverwhereIiiReputationPlace
  renown: OverwhereIiiReputationRenown
}
