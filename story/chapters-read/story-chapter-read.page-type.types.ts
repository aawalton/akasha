import type { CollectionExternal } from "akasha/alan/collections/externals/collection-external.page-type.types.ts"
import type { ExternalLink } from "akasha/alan/collections/externals/properties/external-link.url-property.types.ts"
import type { OwnLength } from "akasha/alan/collections/properties/own-length.number-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { ChronologyAnchors } from "akasha/story/chapters-read/properties/chronology-anchors.page-property-entry.types.ts"
import type { MarkedReadAt } from "akasha/story/chapters-read/properties/marked-read-at.instant-property.types.ts"
import type { ReadChapterStory } from "akasha/story/chapters-read/properties/read-chapter-story.relation-property.types.ts"
import type { RemovedAt } from "akasha/story/chapters-read/properties/removed-at.instant-property.types.ts"
import type { Prose } from "akasha/story/stories-played/properties/prose.file-property.ts"

export type StoryChapterRead = CollectionExternal & {
  title: Title
  story: ReadChapterStory
  ownLength: OwnLength
  externalLink: ExternalLink
  prose: Prose
  removedAt?: RemovedAt
  markedReadAt?: MarkedReadAt
  chronologyAnchors?: ChronologyAnchors
}
