import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXMana = {
  id: "01a0ea83-2a25-7e15-a16f-7cd3f3f981eb",
  type: "page-type/page-type",
  slug: "otherwhere-x-mana",
  definition: "the mana a character in Otherwhere X has left in the core",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
