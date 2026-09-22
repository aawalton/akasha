import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const monarchTag = {
  id: "01a0680a-1a00-700f-a758-9b2c6e3f110f",
  type: "page-type/page-type",
  slug: "monarch-tag",
  definition: "a label applied to a transaction",
  extends: ["page-type/monarch-record"],
  parts: ["number-property/tag-place", "text-property/tag-color"],
  properties: [
    { pageProperty: "text-property/tag-color", required: true, many: false },
    { pageProperty: "number-property/tag-place", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tag is made in Monarch by hand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here creates a tag.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
