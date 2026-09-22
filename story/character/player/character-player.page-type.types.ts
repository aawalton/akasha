import type { Person } from "akasha/agent/seat/properties/person.relation-property.types.ts"
import type { Character } from "akasha/story/character/character.page-type.types.ts"

export type CharacterPlayer = Character & {
  person: Person
}
