import type { PageType } from "@akasha/pages/page-type"
import type { CollectionExternal } from "../../collections/externals/collection-external.page-type.ts"
import type { ExternalLink } from "../../collections/externals/properties/external-link.url-property.ts"
import type { OwnLength } from "../../collections/properties/own-length.number-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { ChronologyAnchors } from "./properties/chronology-anchors.page-property-entry.ts"
import type { MarkedReadAt } from "./properties/marked-read-at.instant-property.ts"
import type { ReadStory } from "./properties/read-story.relation-property.ts"
import type { RemovedAt } from "./properties/removed-at.instant-property.ts"
import type { StorySlug } from "./properties/story-slug.relation-property.ts"

export type StoryChapterRead = CollectionExternal & {
  title: Title
  storySlug?: StorySlug
  ownLength: OwnLength
  externalLink: ExternalLink
  prose: Prose
  removedAt?: RemovedAt
  markedReadAt?: MarkedReadAt
  chronologyAnchors?: ChronologyAnchors
  story?: ReadStory
}

export const storyChapterRead = {
  id: "01a06554-d8bd-72ef-8a40-8ab143986c70",
  pageTypeSlug: "page-type",
  slug: "story-chapter-read",
  definition: "a chapter of a story somebody else wrote",
  pluralSlug: "story-chapters-read",
  extends: ["page-type/collection-external"],
  runsTabooCheck: false,
  detailConfig: {
    display: "reader",
    frame: {
      edgeToEdge: true,
      focusMode: true,
      autoScroll: {
        loadScroll: "progress",
      },
    },
    bodyPropertyId: "prose",
    fullBleed: true,
    showReadingProgress: true,
    markReadOnEnd: true,
    progressPropertyId: "ownProgress",
    lengthPropertyId: "ownLength",
  },
  mediaConfig: {
    audio: {
      sourcePropertyId: "prose",
      renderer: "tts",
      variantAxis: "narrator",
    },
    image: {
      renderer: "z-image-turbo",
    },
  },
  sequence: {
    groupBy: "storySlug",
    orderBy: "position",
    direction: "asc",
  },
  parts: [
    "instant-property/marked-read-at",
    "instant-property/removed-at",
    "number-property/anchor-beat",
    "number-property/anchor-volume",
    "page-property-entry/chronology-anchors",
    "relation-property/story-slug",
    "select-property/anchor-direction",
    "select-property/anchor-kind",
    "select-property/anchor-standing",
    "select-property/anchor-tier",
    "text-property/anchor-chapter",
    "text-property/anchor-claimed-by",
    "text-property/anchor-lexeme",
    "text-property/anchor-reference",
    "relation-property/read-story",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "relation-property/story-slug", required: false, many: false },
    { pagePropertySlug: "number-property/own-length", required: true, many: false },
    { pagePropertySlug: "url-property/external-link", required: true, many: false },
    { pagePropertySlug: "file-property/prose", required: true, many: false },
    { pagePropertySlug: "instant-property/removed-at", required: false, many: false },
    { pagePropertySlug: "instant-property/marked-read-at", required: false, many: false },
    { pagePropertySlug: "page-property-entry/chronology-anchors", required: false, many: false },
    { pagePropertySlug: "relation-property/read-story", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A chapter has the words of the chapter's author rather than akasha's own.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter is part of the one story the chapter was read in.",
    },

    {
      invariantKind: "departure",
      statement: "The source a chapter came from is the source its story names.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter the source took down is kept rather than removed.",
    },
  ],
} as const satisfies PageType
