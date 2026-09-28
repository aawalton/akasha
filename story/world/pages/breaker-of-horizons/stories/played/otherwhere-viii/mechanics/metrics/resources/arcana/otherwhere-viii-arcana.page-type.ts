import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViiiArcana = {
  id: "01a0ea42-ff08-78c0-9d39-87f5d4d13101",
  type: "page-type/page-type",
  slug: "otherwhere-viii-arcana",
  definition: "the arcana a character in Otherwhere VIII has left to draw",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
