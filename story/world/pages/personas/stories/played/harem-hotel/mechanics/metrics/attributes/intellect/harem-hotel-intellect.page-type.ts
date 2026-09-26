import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelIntellect = {
  id: "01a0de49-ed44-7726-942a-194c9a78aa49",
  type: "page-type/page-type",
  slug: "harem-hotel-intellect",
  definition: "how well a character in the Harem Hotel reasons",
  extends: ["page-type/harem-hotel-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
