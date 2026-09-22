import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyChapterWritten = {
  id: "01a06554-d8bd-712b-86b4-ade0001027ee",
  type: "page-type/page-type",
  slug: "story-chapter-written",
  definition: "a chapter of a story written here",
  pluralSlug: "chapters",
  extends: ["page-type/chapter"],
  runsTabooCheck: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's text from before a rewrite is kept in git rather than in a page.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
