import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacter = {
  id: "01a0ca49-6168-7496-8941-ce63271b7a53",
  type: "page-type/page-type",
  slug: "metric-character",
  definition: "a number kept for a character",
  extends: ["page-type/world-metric"],
  parts: [
    "relation-property/metric-of-character",
    "page-type/metric-character-attribute",
    "page-type/metric-character-resource",
    "page-type/metric-character-currency",
  ],
  properties: [
    { pageProperty: "relation-property/metric-of-character", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T18:03:21.832Z",
  updatedAt: "2026-09-30T10:26:37.000Z",
} as const satisfies PageType
