import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIxFluency = {
  id: "01a0ea37-655a-7f54-9007-e99b5724b357",
  type: "page-type/page-type",
  slug: "otherwhere-ix-fluency",
  definition: "how much of one tongue a character in Otherwhere IX understands and speaks",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
