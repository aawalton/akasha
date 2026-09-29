import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIxStatPoints = {
  id: "01a0eac4-8bb3-70fc-9688-79e1b4ebb0f9",
  type: "page-type/page-type",
  slug: "otherwhere-ix-stat-points",
  definition: "the unspent stat points a character in Otherwhere IX holds",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
