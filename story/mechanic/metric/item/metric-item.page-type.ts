import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricItem = {
  id: "01a0ca49-8343-721e-9241-c9fedc882840",
  type: "page-type/page-type",
  slug: "metric-item",
  definition: "a number kept for an item",
  extends: ["page-type/metric"],
  parts: [
    "relation-property/metric-of-item",
    "page-type/tower-item-attack",
    "page-type/tower-item-defence",
    "page-type/tower-item-damage",
  ],
  properties: [{ pageProperty: "relation-property/metric-of-item", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
