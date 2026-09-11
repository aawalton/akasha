import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { OwnLength } from "akasha/alan/collections/properties/own-length.number-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { PlayedChapterStory } from "akasha/story/chapters-played/properties/played-chapter-story.relation-property.types.ts"
import type { Prose } from "akasha/story/stories-played/properties/prose.file-property.ts"

export type StoryChapterPlayed = Collection & {
  title: Title
  story: PlayedChapterStory
  ownLength: OwnLength
  prose: Prose
}
