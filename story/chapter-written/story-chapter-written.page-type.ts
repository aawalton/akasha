import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyChapterWritten = {
  id: "01a06554-d8bd-712b-86b4-ade0001027ee",
  type: "page-type/page-type",
  slug: "story-chapter-written",
  definition: "a chapter of a story written here",
  pluralSlug: "chapters",
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
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is part of the one story the chapter was written for.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's text from before a rewrite is kept in git rather than in a page.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
