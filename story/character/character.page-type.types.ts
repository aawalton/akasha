import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { CharacterPlace } from "akasha/story/character/properties/character-place.relation-property.types.ts"
import type { CharacterStory } from "akasha/story/character/properties/character-story.relation-property.types.ts"

export type Character = Page & {
  title: Title
  story: CharacterStory
  place?: CharacterPlace
}
