import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyChapterWritten = {
  id: "01a06554-d8bd-712b-86b4-ade0001027ee",
  type: "page-type/page-type",
  slug: "story-chapter-written",
  definition: "a chapter of a story written here",
  pluralSlug: "chapters",
  extends: ["page-type/chapter"],
  runsTabooCheck: false,
  properties: [
    {
      pageProperty: "file-property/edits",
      required: false,
      many: false,
      uncommitted: true,
      default: "jsonl",
    },
    {
      pageProperty: "multi-relation-property/scene-images",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "record-property/chapter-pictured",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  parts: [
    "module/chapter-making",
    "module/chapter-panels",
    "module/chapter-read-backlog",
    "multi-relation-property/scene-images",
    "record-property/chapter-pictured",
    "relation-property/pictured-character",
    "text-property/pictured-outfit",
    "text-property/pictured-setting",
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
    markReadOnEnd: true,
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
      statement: "A chapter's text from before a rewrite is kept in git rather than in a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter moves as a turn does, from world-builder through mechanics, recorders and reviewers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter at player is published.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each recorder's drafted edits land with that recorder's own advance.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No player's action makes a chapter.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
