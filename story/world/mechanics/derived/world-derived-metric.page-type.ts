import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldDerivedMetric = {
  id: "01a0ca2c-3188-73cb-9621-2122beb52818",
  type: "page-type/page-type",
  slug: "world-derived-metric",
  definition: "a number worked out from a character's other metrics",
  pluralSlug: "derived",
  extends: ["page-type/world-mechanic", "page-type/domain"],
  parts: [
    "module-property-group/formula",
    "world-derived-metric/tower-health-max",
    "world-derived-metric/tower-mana-max",
    "world-derived-metric/tower-stamina-max",
    "world-derived-metric/tower-initiative",
    "world-derived-metric/tower-physical-attack",
    "world-derived-metric/tower-physical-defence",
    "world-derived-metric/tower-mental-attack",
    "world-derived-metric/tower-mental-defence",
    "world-derived-metric/tower-leveling",
    "world-derived-metric/harem-hotel-health-max",
    "world-derived-metric/harem-hotel-mana-max",
    "world-derived-metric/harem-hotel-stamina-max",
  ],
  properties: [{ pageProperty: "module-property-group/formula", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
