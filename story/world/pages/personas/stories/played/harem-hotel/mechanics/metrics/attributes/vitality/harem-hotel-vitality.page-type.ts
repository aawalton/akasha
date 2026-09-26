import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelVitality = {
  id: "01a0de49-ed44-7e78-985e-8236192fe971",
  type: "page-type/page-type",
  slug: "harem-hotel-vitality",
  definition: "how much a character in the Harem Hotel endures",
  extends: ["page-type/harem-hotel-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
