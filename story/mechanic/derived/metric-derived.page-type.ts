import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricDerived = {
  id: "01a0ca2c-3188-73cb-9621-2122beb52818",
  type: "page-type/page-type",
  slug: "metric-derived",
  definition: "a number worked out from a character's other metrics",
  pluralSlug: "derived",
  extends: ["page-type/mechanic", "page-type/domain"],
  parts: [
    "module-property-group/formula",
    "metric-derived/tower-health-max",
    "metric-derived/tower-mana-max",
    "metric-derived/tower-stamina-max",
    "metric-derived/tower-initiative",
    "metric-derived/tower-physical-attack",
    "metric-derived/tower-physical-defence",
    "metric-derived/tower-mental-attack",
    "metric-derived/tower-mental-defence",
  ],
  properties: [{ pageProperty: "module-property-group/formula", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
