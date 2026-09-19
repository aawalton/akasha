import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyWritten = {
  id: "01a06554-d8bd-7502-a414-fd4fd32eba45",
  type: "page-type/page-type",
  slug: "story-written",
  definition: "a story written here",
  pluralSlug: "stories",
  extends: ["page-type/collection"],
  runsTabooCheck: false,
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
    { pageProperty: "file-property/prose", required: false, many: false },
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
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
