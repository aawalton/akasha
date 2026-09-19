import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"
import type { World } from "akasha/story/world/stories/played/properties/world.relation-property.types.ts"

export type StoryPlayed = Collection & {
  title: Title
  world?: World
  prose?: Prose
}
