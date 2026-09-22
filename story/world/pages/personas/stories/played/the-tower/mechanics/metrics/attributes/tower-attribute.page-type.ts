import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerAttribute = {
  id: "01a0ca26-9ce6-7a3c-8e2d-eb3199a1ecdd",
  type: "page-type/page-type",
  slug: "tower-attribute",
  definition: "a number for a persistent property of a character in the Tower",
  pluralSlug: "attributes",
  extends: ["page-type/metric-character-attribute"],
  parts: [
    "page-type/tower-finesse",
    "page-type/tower-intellect",
    "page-type/tower-luck",
    "page-type/tower-might",
    "page-type/tower-perception",
    "page-type/tower-presence",
    "page-type/tower-vitality",
    "page-type/tower-will",
    "module/tower-attributes-beside",
  ],
  properties: [
    { pageProperty: "number-property/metric-min-value", required: true, many: false, fixed: "0" },
    { pageProperty: "number-property/metric-max-value", required: true, many: false, fixed: "30" },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
