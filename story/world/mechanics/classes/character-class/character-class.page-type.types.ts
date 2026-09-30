import type { ClassCharacter } from "akasha/story/world/mechanics/classes/character-class/properties/class-character.relation-property.types.ts"
import type { HeldClass } from "akasha/story/world/mechanics/classes/character-class/properties/held-class.relation-property.types.ts"
import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export type CharacterClass = WorldClass & {
  character: ClassCharacter
  class: HeldClass
}
