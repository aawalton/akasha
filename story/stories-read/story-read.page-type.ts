import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Source } from "../../collection-system/collection-externals/properties/source.text-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { WorldSlug } from "../stories-played/properties/world-slug.relation-property.ts"
import type { ExternalTags } from "./properties/external-tags.text-property.ts"
import type { PublicationStatus } from "./properties/publication-status.select-property.ts"

export type StoryRead = CollectionExternal & {
  title: Title
  worldSlug: WorldSlug
  source: Source
  externalTags?: readonly ExternalTags[]
  publicationStatus?: PublicationStatus
  prose?: Prose
}

export const storyRead = {
  id: "01a06554-d8bd-7235-9a9d-e26d4823e6d0",
  pageTypeSlug: "page-type",
  slug: "story-read",
  definition: "a story somebody else wrote",
  pluralSlug: "stories-read",
  extendsSlug: "page-type/collection-external",
  runsTabooCheck: false,
  detailConfig: {
    display: "collection",
    header: {
      showCover: true,
      fields: [],
    },
    childCollection: {
      childType: "story-chapter-read",
      childRelation: "partOfSlugs",
    },
  },
  partSlugs: ["select-property/publication-status", "text-property/external-tags"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "world-slug", required: true, many: false },
    { pagePropertySlug: "source", required: true, many: false },
    { pagePropertySlug: "external-tags", required: false, many: true, max: null },
    { pagePropertySlug: "publication-status", required: false, many: false },
    { pagePropertySlug: "prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A story read carries the words of whoever wrote the story rather than akasha's own.",
    },
    {
      invariantKind: "departure",
      statement: "A story names the world the story is of.",
    },
    {
      invariantKind: "departure",
      statement: "A story names the source the story was read from.",
    },
    {
      invariantKind: "departure",
      statement: "A source with no page for a story leaves that story naming no link and no id.",
    },
    {
      invariantKind: "departure",
      statement: "The text a story carries here is what the source says the story is about.",
    },
    {
      invariantKind: "departure",
      statement: "A tag the source gave and a tag the person gave are two properties.",
    },
  ],
} as const satisfies PageType
