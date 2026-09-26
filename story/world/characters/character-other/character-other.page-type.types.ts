import type { CharacterPersona } from "akasha/story/world/characters/character-other/properties/character-persona.relation-property.types.ts"
import type { CharacterPlace } from "akasha/story/world/characters/properties/character-place.relation-property.types.ts"
import type { CharacterStory } from "akasha/story/world/characters/properties/character-story.relation-property.types.ts"
import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export type CharacterOther = WorldCharacter & {
  story: CharacterStory
  place?: CharacterPlace
  persona?: CharacterPersona
}
