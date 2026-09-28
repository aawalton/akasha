import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViiiFluency = {
  id: "01a0ea45-c0fd-77f9-9189-ed12c5bd7dae",
  type: "page-type/page-type",
  slug: "otherwhere-viii-fluency",
  definition: "how much of one tongue a character in Otherwhere VIII understands and speaks",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
