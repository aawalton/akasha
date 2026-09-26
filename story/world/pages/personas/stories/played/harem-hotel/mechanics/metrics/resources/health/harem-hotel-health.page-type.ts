import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelHealth = {
  id: "01a0de48-465c-70ad-a499-e2cb0dafd6ad",
  type: "page-type/page-type",
  slug: "harem-hotel-health",
  definition: "the health a character in the Harem Hotel has left",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
