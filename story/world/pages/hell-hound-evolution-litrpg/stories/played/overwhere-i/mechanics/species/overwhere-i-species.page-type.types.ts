import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"
import type { OverwhereISpeciesCharacter } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/species/properties/overwhere-i-species-character.relation-property.types.ts"
import type { OverwhereISpeciesSpecies } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/species/properties/overwhere-i-species-species.relation-property.types.ts"

export type OverwhereISpecies = WorldSpecies & {
  character: OverwhereISpeciesCharacter
  species: OverwhereISpeciesSpecies
}
