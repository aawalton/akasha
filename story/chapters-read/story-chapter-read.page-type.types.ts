import type { CollectionExternal } from "../../alan/collections/externals/collection-external.page-type.types.ts"
import type { ExternalLink } from "../../alan/collections/externals/properties/external-link.url-property.types.ts"
import type { OwnLength } from "../../alan/collections/properties/own-length.number-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { ChronologyAnchors } from "./properties/chronology-anchors.page-property-entry.types.ts"
import type { MarkedReadAt } from "./properties/marked-read-at.instant-property.types.ts"
import type { ReadChapterStory } from "./properties/read-chapter-story.relation-property.ts"
import type { RemovedAt } from "./properties/removed-at.instant-property.types.ts"

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
