import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { OwnLength } from "akasha/alan/collection/properties/own-length.number-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { ChronologyAnchors } from "akasha/story/chapter-read/properties/chronology-anchors.page-property-entry.types.ts"
import type { MarkedReadAt } from "akasha/story/chapter-read/properties/marked-read-at.instant-property.types.ts"
import type { ReadChapterStory } from "akasha/story/chapter-read/properties/read-chapter-story.relation-property.types.ts"
import type { RemovedAt } from "akasha/story/chapter-read/properties/removed-at.instant-property.types.ts"
import type { Prose } from "akasha/story/world/stories/played/properties/prose.file-property.types.ts"

export type StoryChapterRead = CollectionExternal & {
  title: Title
  story: ReadChapterStory
  ownLength: OwnLength
  prose: Prose
  removedAt?: RemovedAt
  markedReadAt?: MarkedReadAt
  chronologyAnchors?: ChronologyAnchors
}
