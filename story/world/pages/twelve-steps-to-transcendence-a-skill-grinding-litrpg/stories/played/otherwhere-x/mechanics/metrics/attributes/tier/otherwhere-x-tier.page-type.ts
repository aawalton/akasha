import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXTier = {
  id: "01a0ea79-b2bd-7c09-bed3-830f4ff1b69f",
  type: "page-type/page-type",
  slug: "otherwhere-x-tier",
  definition: "the tier the System counts a character in Otherwhere X at",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-29T00:03:59.293Z",
  updatedAt: "2026-09-29T00:04:17.000Z",
} as const satisfies PageType
