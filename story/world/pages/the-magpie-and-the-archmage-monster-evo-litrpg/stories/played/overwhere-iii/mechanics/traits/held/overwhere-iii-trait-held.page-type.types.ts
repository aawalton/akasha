import type { CharacterTrait } from "akasha/story/world/mechanics/traits/character-trait/character-trait.page-type.types.ts"
import type { OverwhereIiiTraitHeldRank } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/held/properties/overwhere-iii-trait-held-rank.number-property.types.ts"
import type { OverwhereIiiTraitHeldTrait } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/held/properties/overwhere-iii-trait-held-trait.relation-property.types.ts"
import type { OverwhereIiiTraitHeldUses } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/held/properties/overwhere-iii-trait-held-uses.number-property.types.ts"

export type OverwhereIiiTraitHeld = CharacterTrait & {
  trait: OverwhereIiiTraitHeldTrait
  rank: OverwhereIiiTraitHeldRank
  uses: OverwhereIiiTraitHeldUses
}
