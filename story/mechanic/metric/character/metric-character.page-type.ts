import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacter = {
  id: "01a0ca49-6168-7496-8941-ce63271b7a53",
  type: "page-type/page-type",
  slug: "metric-character",
  definition: "a number kept for a character",
  extends: ["page-type/metric"],
  parts: [
    "relation-property/metric-of-character",
    "page-type/metric-character-attribute",
    "page-type/resource",
  ],
  properties: [
    { pageProperty: "relation-property/metric-of-character", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
