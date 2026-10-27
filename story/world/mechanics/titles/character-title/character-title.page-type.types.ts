import type { HeldTitle } from "akasha/story/world/mechanics/titles/character-title/properties/held-title.relation-property.types.ts"
import type { TitleCharacter } from "akasha/story/world/mechanics/titles/character-title/properties/title-character.relation-property.types.ts"
import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export type CharacterTitle = WorldTitle & {
  character: TitleCharacter
  worldTitle: HeldTitle
}
