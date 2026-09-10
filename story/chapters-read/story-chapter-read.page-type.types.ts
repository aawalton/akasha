import type { CollectionExternal } from "../../collections/externals/collection-external.page-type.types.ts"
import type { ExternalLink } from "../../collections/externals/properties/external-link.url-property.ts"
import type { OwnLength } from "../../collections/properties/own-length.number-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { ChronologyAnchors } from "./properties/chronology-anchors.page-property-entry.ts"
import type { MarkedReadAt } from "./properties/marked-read-at.instant-property.ts"
import type { ReadChapterStory } from "./properties/read-chapter-story.relation-property.ts"
import type { RemovedAt } from "./properties/removed-at.instant-property.ts"

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
