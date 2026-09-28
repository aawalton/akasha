import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereVTalent = {
  id: "01a0ea00-7cea-7b8e-a94e-3a1d2f196a6c",
  type: "page-type/page-type",
  slug: "otherwhere-v-talent",
  definition: "one Talent a character in Otherwhere V holds, at its rank",
  pluralSlug: "talents",
  extends: ["page-type/character-trait"],
  parts: ["number-property/otherwhere-v-rank"],
  properties: [{ pageProperty: "number-property/otherwhere-v-rank", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
