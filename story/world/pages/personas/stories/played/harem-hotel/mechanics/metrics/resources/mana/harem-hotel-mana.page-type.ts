import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelMana = {
  id: "01a0de48-465c-76c3-9fea-6bd0b41f9ce1",
  type: "page-type/page-type",
  slug: "harem-hotel-mana",
  definition: "the magic a character in the Harem Hotel has left",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
