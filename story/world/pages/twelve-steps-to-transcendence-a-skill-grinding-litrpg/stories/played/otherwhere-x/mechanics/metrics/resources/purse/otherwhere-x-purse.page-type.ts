import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXPurse = {
  id: "01a0ea77-4153-78d4-8499-04045755649d",
  type: "page-type/page-type",
  slug: "otherwhere-x-purse",
  definition: "the money a character in Otherwhere X carries, counted in copper",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
