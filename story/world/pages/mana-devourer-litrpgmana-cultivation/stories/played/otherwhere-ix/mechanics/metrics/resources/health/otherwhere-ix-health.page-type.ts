import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIxHealth = {
  id: "01a0ea37-655b-746c-abe1-7f4f2197702f",
  type: "page-type/page-type",
  slug: "otherwhere-ix-health",
  definition: "the health a character in Otherwhere IX has left",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
