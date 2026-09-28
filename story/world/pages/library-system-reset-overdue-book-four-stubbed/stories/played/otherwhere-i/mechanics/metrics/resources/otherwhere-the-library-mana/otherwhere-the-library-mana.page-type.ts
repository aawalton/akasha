import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereTheLibraryMana = {
  id: "01a0e362-5fe1-7d9d-87e4-a85bfe3526da",
  type: "page-type/page-type",
  slug: "otherwhere-the-library-mana",
  definition: "the mana a character in Otherwhere has left to spend",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
