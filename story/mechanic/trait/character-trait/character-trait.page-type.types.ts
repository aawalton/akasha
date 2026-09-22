import type { TraitCharacter } from "akasha/story/mechanic/trait/character-trait/properties/trait-character.relation-property.types.ts"
import type { Trait } from "akasha/story/mechanic/trait/trait.page-type.types.ts"

export type CharacterTrait = Trait & {
  character: TraitCharacter
}
