import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereVFluency = {
  id: "01a0e9fe-e160-76d5-9722-e37575f46acd",
  type: "page-type/page-type",
  slug: "otherwhere-v-fluency",
  definition: "how much of one tongue a character in Otherwhere V understands and speaks",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
