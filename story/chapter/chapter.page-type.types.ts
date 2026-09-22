import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { OwnLength } from "akasha/alan/collection/properties/own-length.number-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { ChapterStory } from "akasha/story/chapter/properties/chapter-story.relation-property.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"

export type Chapter = Collection & {
  title: Title
  story: ChapterStory
  ownLength: OwnLength
  prose: Prose
}
