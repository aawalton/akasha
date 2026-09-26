import type { Character } from "akasha/story/character/character.page-type.types.ts"
import type { CharacterPersona } from "akasha/story/character/other/properties/character-persona.relation-property.types.ts"

export type CharacterOther = Character & {
  persona?: CharacterPersona
}
