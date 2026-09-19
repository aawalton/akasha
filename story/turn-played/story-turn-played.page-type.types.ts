import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"

export type StoryTurnPlayed = Collection & {
  prose: Prose
}
