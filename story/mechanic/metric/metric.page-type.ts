import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metric = {
  id: "01a0ca08-5607-7cf7-8091-650c47a04416",
  type: "page-type/page-type",
  slug: "metric",
  definition: "a number kept for a character",
  pluralSlug: "metrics",
  extends: ["page-type/mechanic"],
  parts: [
    "file-property/history",
    "number-property/metric-max-value",
    "number-property/metric-min-value",
    "number-property/metric-value",
    "relation-property/metric-character",
    "page-type/character-attribute",
    "page-type/resource",
  ],
  properties: [
    { pageProperty: "relation-property/metric-character", required: true, many: false },
    { pageProperty: "number-property/metric-value", required: true, many: false },
    { pageProperty: "number-property/metric-min-value", required: false, many: false },
    { pageProperty: "number-property/metric-max-value", required: false, many: false },
    { pageProperty: "file-property/history", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
