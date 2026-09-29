import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXPractice = {
  id: "01a0ea79-b2bd-717c-a3b4-bbcd50692c65",
  type: "page-type/page-type",
  slug: "otherwhere-x-practice",
  definition: "the practice a character in Otherwhere X has banked in one ability, in points",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
