import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelLevel = {
  id: "01a0de49-ed44-7032-a334-98de8ef578c7",
  type: "page-type/page-type",
  slug: "harem-hotel-level",
  definition: "how far a character in the Harem Hotel has come",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
