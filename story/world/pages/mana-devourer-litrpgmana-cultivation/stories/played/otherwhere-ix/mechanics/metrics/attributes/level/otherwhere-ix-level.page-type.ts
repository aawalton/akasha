import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIxLevel = {
  id: "01a0ea37-655b-79ae-b8f3-41d00870be7e",
  type: "page-type/page-type",
  slug: "otherwhere-ix-level",
  definition: "the level the system counts a character in Otherwhere IX at",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
