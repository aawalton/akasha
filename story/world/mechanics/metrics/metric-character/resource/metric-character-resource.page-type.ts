import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterResource = {
  id: "01a0c9d2-5f3d-7dd9-b045-d1b69e79a27a",
  type: "page-type/page-type",
  slug: "metric-character-resource",
  definition: "something a character spends down and gets back",
  pluralSlug: "resources",
  extends: ["page-type/metric-character"],
  parts: [
    "page-type/tower-health",
    "page-type/tower-mana",
    "page-type/tower-stamina",
    "page-type/tower-attribute-point",
    "page-type/partners-hp",
    "page-type/partners-focus",
    "page-type/partners-stamina",
    "page-type/partners-attribute-increase",
    "page-type/harem-hotel-health",
    "page-type/harem-hotel-mana",
    "page-type/harem-hotel-stamina",
    "page-type/harem-hotel-attribute-point",
    "page-type/partners-ii-hp",
    "page-type/partners-ii-focus",
    "page-type/partners-ii-stamina",
  ],

  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
