import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"
import type { OverwhereIiiSpeciesHeldCharacter } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/species-held/properties/overwhere-iii-species-held-character.relation-property.types.ts"
import type { OverwhereIiiSpeciesHeldSpecies } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/species-held/properties/overwhere-iii-species-held-species.relation-property.types.ts"

export type OverwhereIiiSpeciesHeld = WorldSpecies & {
  character: OverwhereIiiSpeciesHeldCharacter
  species: OverwhereIiiSpeciesHeldSpecies
}
