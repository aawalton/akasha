import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../collection-system/collection-externals/collection-external.page-type.ts"
import type { ExternalLink } from "../../collection-system/collection-externals/properties/external-link.url-property.ts"
import type { OwnLength } from "../../collection-system/collections/properties/own-length.number-property.ts"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { RemovedAt } from "../story-chapters-read/properties/removed-at.instant-property.ts"
import type { MarkedReadAt } from "./properties/marked-read-at.instant-property.ts"

export type StoryChapterRoyalRoad = CollectionExternal & {
  title: Title
  ownLength: OwnLength
  externalLink: ExternalLink
  prose?: Prose
  markedReadAt?: MarkedReadAt
  removedAt?: RemovedAt
}

export const storyChapterRoyalRoad = {
  id: "01a0659c-387a-7f1a-94b0-dca83e7340d5",
  pageTypeSlug: "page-type",
  slug: "story-chapter-royal-road",
  definition: "a chapter of a story published on Royal Road",
  pluralSlug: "story-chapters-royal-road",
  extendsSlug: "page-type/collection-external",
  runsTabooCheck: false,
  partSlugs: ["instant-property/marked-read-at"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "own-length", required: true, many: false },
    { pagePropertySlug: "external-link", required: true, many: false },
    { pagePropertySlug: "prose", required: false, many: false },
    { pagePropertySlug: "marked-read-at", required: false, many: false },
    { pagePropertySlug: "removed-at", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A chapter carries the words of whoever wrote the chapter rather than akasha's own.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter is part of the one story the chapter was published in.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter's slug opens with the story the chapter is part of.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter whose slug would open with a digit carries its source in front as well.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter longer than one file carries its prose in parts numbered from two.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter the source took down is kept rather than removed.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter announcing a book rather than telling one is a chapter all the same.",
    },
  ],
} as const satisfies PageType
