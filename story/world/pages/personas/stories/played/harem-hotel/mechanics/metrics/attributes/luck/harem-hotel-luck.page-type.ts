import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelLuck = {
  id: "01a0de49-ed44-7f41-a37a-f34932dd9e44",
  type: "page-type/page-type",
  slug: "harem-hotel-luck",
  definition: "how far chance favours a character in the Harem Hotel",
  extends: ["page-type/harem-hotel-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
