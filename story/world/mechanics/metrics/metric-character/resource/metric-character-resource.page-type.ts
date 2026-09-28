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
    "page-type/tower-of-nimue-free-point",
    "page-type/otherwhere-the-library-health",
    "page-type/otherwhere-the-library-mana",
    "page-type/otherwhere-the-library-power",
    "page-type/otherwhere-the-library-funds",
    "page-type/otherwhere-health",
    "page-type/otherwhere-stamina",
    "page-type/otherwhere-mana",
    "page-type/otherwhere-experience-points",
    "page-type/otherwhere-iv-purse",
    "page-type/otherwhere-iv-health",
    "page-type/otherwhere-v-health",
    "page-type/otherwhere-v-purse",
  ],

  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
