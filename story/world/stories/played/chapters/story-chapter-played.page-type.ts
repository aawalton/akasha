import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyChapterPlayed = {
  id: "01a064b4-46c9-7489-9817-d9dae65e7936",
  type: "page-type/page-type",
  slug: "story-chapter-played",
  definition: "a chapter of a story nobody wrote",
  pluralSlug: "chapters",
  extends: ["page-type/chapter"],
  runsTabooCheck: false,
  parts: [
    "record-property/chapter-turn-covers",
    "text-property/last-turn",
    "number-property/last-turn-position",
  ],
  properties: [
    {
      pageProperty: "record-property/chapter-turn-covers",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/last-turn", required: false, many: false },
    { pageProperty: "number-property/last-turn-position", required: false, many: false },
  ],
  detailConfig: {
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
    progressPropertyId: "ownProgress",
    lengthPropertyId: "ownLength",
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
      statement: "A chapter is made from its story's turns, and those turns then go.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pictures of the turns a chapter took are drawn from that chapter.",
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
