import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterPoint = {
  id: "01a17eb5-d80d-72e5-8c0a-53380a0f0aee",
  type: "page-type/page-type",
  slug: "metric-character-point",
  definition: "points a character has left to spend",
  pluralSlug: "points",
  extends: ["page-type/metric-character-resource"],
  parts: [
    "page-type/tower-attribute-point",
    "page-type/tower-of-nimue-free-point",
    "page-type/otherwhere-ix-stat-points",
    "page-type/overwhere-iv-points",
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-27T18:53:28.972Z",
  updatedAt: "2026-10-27T18:53:28.972Z",
} as const satisfies PageType
