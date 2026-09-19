import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { OwnLength } from "akasha/alan/collection/properties/own-length.number-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"
import type { WrittenChapterStory } from "akasha/story/world/stories/written/chapters/properties/written-chapter-story.relation-property.types.ts"

export type StoryChapterWritten = Collection & {
  title: Title
  story: WrittenChapterStory
  ownLength: OwnLength
  prose: Prose
}
