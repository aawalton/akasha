import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXEssence = {
  id: "01a0ea79-b2bd-731d-90e6-8795649be4f8",
  type: "page-type/page-type",
  slug: "otherwhere-x-essence",
  definition: "the essence a character in Otherwhere X has gathered toward the next tier",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
