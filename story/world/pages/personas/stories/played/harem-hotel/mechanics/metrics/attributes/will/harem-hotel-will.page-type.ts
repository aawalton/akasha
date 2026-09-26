import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelWill = {
  id: "01a0de49-ed44-7e4b-b489-0af2c2a92594",
  type: "page-type/page-type",
  slug: "harem-hotel-will",
  definition: "how firmly a character in the Harem Hotel holds a purpose",
  extends: ["page-type/harem-hotel-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
