import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../collection-system/collections/collection.page-type.ts"
import type { OwnLength } from "../../collection-system/collections/properties/own-length.number-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"

export type StoryChapterWritten = Collection & {
  title: Title
  ownLength: OwnLength
  prose: Prose
}

export const storyChapterWritten = {
  id: "01a06554-d8bd-712b-86b4-ade0001027ee",
  pageTypeSlug: "page-type",
  slug: "story-chapter-written",
  definition: "a chapter of a story written here",
  pluralSlug: "story-chapters-written",
  extendsSlug: ["page-type/collection"],
  runsTabooCheck: false,
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "own-length", required: true, many: false },
    { pagePropertySlug: "prose", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A chapter is part of the one story the chapter was written for.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter's slug opens with the story the chapter is part of.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter's text from before a rewrite is kept in git rather than in a page.",
    },
  ],
} as const satisfies PageType
