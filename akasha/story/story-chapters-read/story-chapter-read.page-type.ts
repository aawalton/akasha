import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../collection-system/collection-externals/collection-external.page-type.ts"
import type { ExternalLink } from "../../collection-system/collection-externals/properties/external-link.url-property.ts"
import type { OwnLength } from "../../collection-system/collections/properties/own-length.number-property.ts"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { ChronologyAnchors } from "./properties/chronology-anchors.page-property-entry.ts"
import type { RemovedAt } from "./properties/removed-at.instant-property.ts"

export type StoryChapterRead = CollectionExternal & {
  title: Title
  ownLength: OwnLength
  externalLink: ExternalLink
  prose: Prose
  removedAt?: RemovedAt
  chronologyAnchors?: ChronologyAnchors
}

export const storyChapterRead = {
  id: "01a06554-d8bd-72ef-8a40-8ab143986c70",
  pageTypeSlug: "page-type",
  slug: "story-chapter-read",
  definition: "a chapter of a story somebody else wrote",
  pluralSlug: "story-chapters-read",
  extendsSlug: "page-type/collection-external",
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
    groupBy: "partOfSlugs",
    orderBy: "position",
    direction: "asc",
  },
  partSlugs: [
    "instant-property/removed-at",
    "number-property/anchor-beat",
    "number-property/anchor-volume",
    "page-property-entry/chronology-anchors",
    "select-property/anchor-direction",
    "select-property/anchor-kind",
    "select-property/anchor-standing",
    "select-property/anchor-tier",
    "text-property/anchor-chapter",
    "text-property/anchor-claimed-by",
    "text-property/anchor-lexeme",
    "text-property/anchor-reference",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "own-length", required: true, many: false },
    { pagePropertySlug: "external-link", required: true, many: false },
    { pagePropertySlug: "prose", required: true, many: false },
    { pagePropertySlug: "removed-at", required: false, many: false },
    { pagePropertySlug: "chronology-anchors", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A chapter carries the words of whoever wrote the chapter rather than akasha's own.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter is part of the one story the chapter was read in.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter's slug opens with the story the chapter is part of.",
    },
    {
      invariantKind: "departure",
      statement: "The source a chapter came from is the one its story names.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter the source took down is kept rather than removed.",
    },
  ],
} as const satisfies PageType
