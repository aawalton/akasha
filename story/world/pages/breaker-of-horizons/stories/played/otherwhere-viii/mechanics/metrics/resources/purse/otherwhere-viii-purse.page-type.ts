import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViiiPurse = {
  id: "01a0ea43-a044-7924-a108-29706b2b9ed4",
  type: "page-type/page-type",
  slug: "otherwhere-viii-purse",
  definition: "the money a character in Otherwhere VIII holds, counted in bits",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
