import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../collection-system/collections/collection.page-type.ts"
import type { OwnLength } from "../../collection-system/collections/properties/own-length.number-property.ts"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"

export type StoryChapterPlayed = Collection & {
  title: Title
  ownLength: OwnLength
  prose: Prose
}

export const storyChapterPlayed = {
  id: "01a064b4-46c9-7489-9817-d9dae65e7936",
  pageTypeSlug: "page-type",
  slug: "story-chapter-played",
  definition: "a chapter of a story nobody wrote",
  pluralSlug: "story-chapters-played",
  extendsSlug: "page-type/collection",
  runsTabooCheck: false,
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "own-length", required: true, many: false },
    { pagePropertySlug: "prose", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A chapter carries the prose play made rather than prose anybody wrote.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter is part of the one story the chapter was played in.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter's slug opens with the story the chapter is part of.",
    },
  ],
} as const satisfies PageType
