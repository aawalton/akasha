import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterResource = {
  id: "01a0c9d2-5f3d-7dd9-b045-d1b69e79a27a",
  type: "page-type/page-type",
  slug: "metric-character-resource",
  definition: "something a character spends down and gets back",
  pluralSlug: "resources",
  extends: ["page-type/metric-character"],
  parts: [
    "page-type/metric-character-health",
    "page-type/metric-character-mana",
    "page-type/metric-character-stamina",
    "page-type/metric-character-experience",
    "page-type/tower-health",
    "page-type/tower-mana",
    "page-type/tower-stamina",
    "page-type/tower-attribute-point",
    "page-type/tower-of-nimue-free-point",
    "page-type/otherwhere-i-power",
    "page-type/otherwhere-ix-stat-points",
    "page-type/overwhere-iv-points",
    "page-type/overwhere-iii-blightstones",
    "page-type/overwhere-i-reserve",
    "page-type/overwhere-ii-vigour",
    "page-type/overwhere-ii-reservoir",
  ],

  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
