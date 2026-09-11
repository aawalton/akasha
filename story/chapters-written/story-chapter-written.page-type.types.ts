import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { OwnLength } from "akasha/alan/collections/properties/own-length.number-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { WrittenChapterStory } from "akasha/story/chapters-written/properties/written-chapter-story.relation-property.types.ts"
import type { Prose } from "akasha/story/stories-played/properties/prose.file-property.ts"

export type StoryChapterWritten = Collection & {
  title: Title
  story: WrittenChapterStory
  ownLength: OwnLength
  prose: Prose
}
