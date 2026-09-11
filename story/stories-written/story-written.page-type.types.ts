import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { Prose } from "akasha/story/stories-played/properties/prose.file-property.ts"
import type { World } from "akasha/story/stories-played/properties/world.relation-property.types.ts"

export type StoryWritten = Collection & {
  title: Title
  world?: World
  prose?: Prose
}
