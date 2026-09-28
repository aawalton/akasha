import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIPower = {
  id: "01a0e362-5fe1-77d2-80cf-473c318056a1",
  type: "page-type/page-type",
  slug: "otherwhere-i-power",
  definition: "the power a place that lives in Otherwhere has left",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
