import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyWritten = {
  id: "01a06554-d8bd-7502-a414-fd4fd32eba45",
  type: "page-type/page-type",
  slug: "story-written",
  definition: "a story written here",
  icon: "feather",
  pluralSlug: "stories",
  extends: ["page-type/story"],
  runsTabooCheck: false,
  detailConfig: {
    header: {
      showCover: true,
      fields: [],
    },
  },
  parts: [
    "page-type/story-chapter-written",
    "module/chapter-writing",
    "module/nightly-chapter-writing",
    "service-workstation/nightly-chapter-writing",
    "number-property/word-backlog",
    "boolean-property/editor-steps",
    "boolean-property/prose-on-beats",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story written was set down chapter by chapter rather than played or read.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "More than one story written may be of the one world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story written's page starts its next chapter with a button.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  properties: [
    { pageProperty: "number-property/word-backlog", required: false, many: false },
    {
      pageProperty: "relation-property/cover-reroll",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "text-property/cover-reroll-refused",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pageProperty: "boolean-property/editor-steps", required: false, many: false },
    { pageProperty: "boolean-property/prose-on-beats", required: false, many: false },
  ],
} as const satisfies PageType
