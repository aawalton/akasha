import type { PageType } from "@akasha/pages/page-type"
import type { Collection } from "../../collections/collection.page-type.ts"
import type { OwnLength } from "../../collections/properties/own-length.number-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { WrittenChapterStory } from "./properties/written-chapter-story.relation-property.ts"

export type StoryChapterWritten = Collection & {
  title: Title
  story: WrittenChapterStory
  ownLength: OwnLength
  prose: Prose
}

export const storyChapterWritten = {
  id: "01a06554-d8bd-712b-86b4-ade0001027ee",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "story-chapter-written",
  definition: "a chapter of a story written here",
  pluralSlug: "story-chapters-written",
  extends: ["page-type/collection"],
  runsTabooCheck: false,
  parts: ["relation-property/written-chapter-story"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "relation-property/written-chapter-story",
      required: true,
      many: false,
    },
    { pageProperty: "number-property/own-length", required: true, many: false },
    { pageProperty: "file-property/prose", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A chapter is part of the one story the chapter was written for.",
    },

    {
      invariantKind: "departure",
      statement: "A chapter's text from before a rewrite is kept in git rather than in a page.",
    },
  ],
} as const satisfies PageType
