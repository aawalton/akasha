import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const cornerstoneFaculty = {
  id: "01a0dee4-467b-76be-b386-8f81567faec4",
  type: "page-type/page-type",
  slug: "cornerstone-faculty",
  definition: "the Depth one Faculty of the Waking Stone has in Cornerstone",
  pluralSlug: "attributes",
  extends: ["page-type/metric-character-attribute"],
  parts: [
    "page-type/cornerstone-touch",
    "page-type/cornerstone-sight",
    "page-type/cornerstone-warmth",
    "page-type/cornerstone-provision",
    "page-type/cornerstone-memory",
    "page-type/cornerstone-reach",
  ],
  properties: [
    { pageProperty: "number-property/metric-min-value", required: true, many: false, fixed: "0" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Faculty's value is its Depth, and a dormant Faculty has Depth zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each Faculty states the deepest Depth it can reach.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
