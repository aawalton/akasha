import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelFinesse = {
  id: "01a0de49-ed43-7fcf-bc69-637f811af1be",
  type: "page-type/page-type",
  slug: "harem-hotel-finesse",
  definition: "how precisely a character in the Harem Hotel moves",
  extends: ["page-type/harem-hotel-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
