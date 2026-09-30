import type { HeldSpecies } from "akasha/story/world/mechanics/species/character-species/properties/held-species.relation-property.types.ts"
import type { SpeciesCharacter } from "akasha/story/world/mechanics/species/character-species/properties/species-character.relation-property.types.ts"
import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export type CharacterSpecies = WorldSpecies & {
  character: SpeciesCharacter
  species: HeldSpecies
}
