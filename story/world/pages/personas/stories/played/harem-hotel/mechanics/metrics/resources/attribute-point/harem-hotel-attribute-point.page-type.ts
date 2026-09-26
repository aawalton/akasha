import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelAttributePoint = {
  id: "01a0de48-465b-7395-9083-89e9d7b9b6b5",
  type: "page-type/page-type",
  slug: "harem-hotel-attribute-point",
  definition: "a point a character in the Harem Hotel has left to raise an attribute with",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
