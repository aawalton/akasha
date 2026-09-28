import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIxPurse = {
  id: "01a0ea37-655b-7eb6-be7d-0f46c461215d",
  type: "page-type/page-type",
  slug: "otherwhere-ix-purse",
  definition: "the money a character in Otherwhere IX holds, counted in copper",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
