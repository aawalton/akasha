import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelPresence = {
  id: "01a0de49-ed44-7eba-b44d-27b534c240a0",
  type: "page-type/page-type",
  slug: "harem-hotel-presence",
  definition: "how strongly a character in the Harem Hotel carries a room",
  extends: ["page-type/harem-hotel-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
