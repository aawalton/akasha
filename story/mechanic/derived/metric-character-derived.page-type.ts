import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterDerived = {
  id: "01a0ca2c-3188-73cb-9621-2122beb52818",
  type: "page-type/page-type",
  slug: "metric-character-derived",
  definition: "a number worked out from a character's other metrics",
  pluralSlug: "derived",
  extends: ["page-type/mechanic", "page-type/domain"],
  parts: [
    "module-property-group/formula",
    "metric-character-derived/tower-health-max",
    "metric-character-derived/tower-mana-max",
    "metric-character-derived/tower-stamina-max",
    "metric-character-derived/tower-initiative",
    "metric-character-derived/tower-physical-attack",
    "metric-character-derived/tower-physical-defence",
    "metric-character-derived/tower-mental-attack",
    "metric-character-derived/tower-mental-defence",
  ],
  properties: [{ pageProperty: "module-property-group/formula", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
