import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXHealth = {
  id: "01a0ea6b-036c-7837-b8c0-386bc03f169e",
  type: "page-type/page-type",
  slug: "otherwhere-x-health",
  definition: "the health a character in Otherwhere X has left",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
