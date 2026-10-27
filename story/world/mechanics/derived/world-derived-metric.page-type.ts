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
    "module/derived-beside",
    "world-derived-metric/cornerstone-wakefulness",
    "world-derived-metric/tower-of-nimue-hp",
    "world-derived-metric/tower-of-nimue-focus",
    "world-derived-metric/tower-of-nimue-basic-strike",
  ],
  properties: [{ pageProperty: "module-property-group/formula", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T17:31:29.032Z",
  updatedAt: "2026-10-27T20:05:18.843Z",
} as const satisfies PageType
