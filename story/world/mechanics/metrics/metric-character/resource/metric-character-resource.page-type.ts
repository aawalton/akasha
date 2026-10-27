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
    "page-type/metric-character-point",
    "page-type/tower-health",
    "page-type/tower-mana",
    "page-type/tower-stamina",
    "page-type/overwhere-iii-blightstones",
  ],

  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T15:53:22.493Z",
  updatedAt: "2026-10-27T19:46:50.059Z",
} as const satisfies PageType
