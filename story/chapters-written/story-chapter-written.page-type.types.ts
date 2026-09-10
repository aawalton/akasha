import type { Collection } from "../../collections/collection.page-type.types.ts"
import type { OwnLength } from "../../collections/properties/own-length.number-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { WrittenChapterStory } from "./properties/written-chapter-story.relation-property.ts"

export type StoryChapterWritten = Collection & {
  title: Title
  story: WrittenChapterStory
  ownLength: OwnLength
  prose: Prose
}
