import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const chapter = {
  id: "01a0c990-31c3-78c4-8145-70d13440d89c",
  type: "page-type/page-type",
  slug: "chapter",
  definition: "the text a reader reads at one sitting",
  pluralSlug: "chapters",
  extends: ["page-type/collection"],
  runsTabooCheck: false,
  parts: ["relation-property/chapter-story"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/chapter-story", required: true, many: false },
    { pageProperty: "number-property/own-length", required: true, many: false },
    { pageProperty: "file-property/prose", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is part of the one story the chapter is of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words a chapter has are its author's rather than akasha's own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
