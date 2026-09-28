import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViiiHealth = {
  id: "01a0ea42-3e8d-7ab5-88ed-67dde1547e7e",
  type: "page-type/page-type",
  slug: "otherwhere-viii-health",
  definition: "the health a character in Otherwhere VIII has left",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
