import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { TraitStory } from "akasha/story/world/mechanics/traits/properties/trait-story.relation-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type WorldTrait = WorldMechanic & {
  title: Title
  story: TraitStory
}
