import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIxAttribute = {
  id: "01a0ea37-6559-7d6d-ad51-6eb1e35dc200",
  type: "page-type/page-type",
  slug: "otherwhere-ix-attribute",
  definition: "one attribute the system measures in a character in Otherwhere IX",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
