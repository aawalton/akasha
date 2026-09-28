import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereVPurse = {
  id: "01a0e9fe-e160-78b4-ad3b-4d43628fcb0f",
  type: "page-type/page-type",
  slug: "otherwhere-v-purse",
  definition: "the money a character in Otherwhere V holds, counted in copper",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
