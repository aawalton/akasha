import type { TraitCharacter } from "akasha/story/world/mechanics/traits/character-trait/properties/trait-character.relation-property.types.ts"
import type { WorldTrait } from "akasha/story/world/mechanics/traits/world-trait.page-type.types.ts"

export type CharacterTrait = WorldTrait & {
  character: TraitCharacter
}
