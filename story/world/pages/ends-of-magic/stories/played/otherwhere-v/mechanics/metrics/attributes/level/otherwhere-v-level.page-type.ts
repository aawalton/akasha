import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereVLevel = {
  id: "01a0e9fe-e160-7136-a89e-e1ab4de9fb19",
  type: "page-type/page-type",
  slug: "otherwhere-v-level",
  definition: "the level Davrar counts a character in Otherwhere V at",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
