import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyChapterPlayed = {
  id: "01a064b4-46c9-7489-9817-d9dae65e7936",
  type: "page-type/page-type",
  slug: "story-chapter-played",
  definition: "a chapter of a story nobody wrote",
  pluralSlug: "chapters",
  extends: ["page-type/chapter"],
  runsTabooCheck: false,
  detailConfig: {
    bodyPropertyId: "prose",
  },
  sequence: {
    groupBy: "story",
    orderBy: "position",
    direction: "asc",
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter has the prose play made rather than prose anybody wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window block in a chapter's prose is drawn as its window card, as it is in a turn's prose.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
