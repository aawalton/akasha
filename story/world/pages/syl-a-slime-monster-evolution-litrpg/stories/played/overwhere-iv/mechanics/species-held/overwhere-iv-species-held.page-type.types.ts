import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"
import type { OverwhereIvSpeciesHeldCharacter } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/species-held/properties/overwhere-iv-species-held-character.relation-property.types.ts"
import type { OverwhereIvSpeciesHeldSpecies } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/species-held/properties/overwhere-iv-species-held-species.relation-property.types.ts"

export type OverwhereIvSpeciesHeld = WorldSpecies & {
  character: OverwhereIvSpeciesHeldCharacter
  species: OverwhereIvSpeciesHeldSpecies
}
