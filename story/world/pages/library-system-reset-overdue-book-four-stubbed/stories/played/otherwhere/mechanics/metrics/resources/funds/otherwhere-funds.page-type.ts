import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereFunds = {
  id: "01a0e362-5fe0-70c4-b200-6dfb373488ee",
  type: "page-type/page-type",
  slug: "otherwhere-funds",
  definition: "the money a character in Otherwhere holds",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
