import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIxMana = {
  id: "01a0ea37-655b-7d12-9878-bf174e485025",
  type: "page-type/page-type",
  slug: "otherwhere-ix-mana",
  definition: "the mana a character in Otherwhere IX holds",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
