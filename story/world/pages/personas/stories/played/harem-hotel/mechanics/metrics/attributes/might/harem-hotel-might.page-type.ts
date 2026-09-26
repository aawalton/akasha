import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelMight = {
  id: "01a0de49-ed44-70f3-bb77-61230a572f21",
  type: "page-type/page-type",
  slug: "harem-hotel-might",
  definition: "how hard a character in the Harem Hotel hits",
  extends: ["page-type/harem-hotel-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
