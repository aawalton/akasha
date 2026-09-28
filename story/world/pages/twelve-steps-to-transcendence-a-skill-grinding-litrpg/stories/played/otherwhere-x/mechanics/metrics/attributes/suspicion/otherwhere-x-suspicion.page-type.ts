import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXSuspicion = {
  id: "01a0ea74-df5f-7993-9769-dd714321e777",
  type: "page-type/page-type",
  slug: "otherwhere-x-suspicion",
  definition: "how far those with a say in Otherwhere X suspect a character",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
