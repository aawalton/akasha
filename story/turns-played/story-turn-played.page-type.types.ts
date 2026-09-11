import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { Prose } from "akasha/story/stories-played/properties/prose.file-property.ts"

export type StoryTurnPlayed = Collection & {
  prose: Prose
}
