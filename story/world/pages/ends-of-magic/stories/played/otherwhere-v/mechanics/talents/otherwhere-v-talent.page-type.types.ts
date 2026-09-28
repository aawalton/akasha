import type { CharacterTrait } from "akasha/story/world/mechanics/traits/character-trait/character-trait.page-type.types.ts"
import type { OtherwhereVRank } from "akasha/story/world/pages/ends-of-magic/stories/played/otherwhere-v/mechanics/talents/properties/otherwhere-v-rank.number-property.types.ts"

export type OtherwhereVTalent = CharacterTrait & {
  rank: OtherwhereVRank
}
