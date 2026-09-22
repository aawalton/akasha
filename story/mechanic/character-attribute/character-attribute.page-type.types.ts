import type { AttributeCharacter } from "akasha/story/mechanic/character-attribute/properties/attribute-character.relation-property.types.ts"
import type { AttributeValue } from "akasha/story/mechanic/character-attribute/properties/attribute-value.number-property.types.ts"
import type { Mechanic } from "akasha/story/mechanic/mechanic.page-type.types.ts"

export type CharacterAttribute = Mechanic & {
  character: AttributeCharacter
  value: AttributeValue
}
