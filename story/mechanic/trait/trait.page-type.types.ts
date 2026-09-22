import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Mechanic } from "akasha/story/mechanic/mechanic.page-type.types.ts"
import type { TraitStory } from "akasha/story/mechanic/trait/properties/trait-story.relation-property.types.ts"

export type Trait = Mechanic & {
  title: Title
  story: TraitStory
}
