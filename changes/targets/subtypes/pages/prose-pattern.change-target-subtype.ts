import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.types.ts"

export const prosePattern = {
  id: "01a08216-e1c2-73ca-b417-23ded9773d10",
  pageTypeSlug: "change-target-subtype",
  type: "change-target-subtype",
  slug: "prose-pattern",
  definition: "the prose one pattern matches",
  changeTargetType: "change-target-type/prose",
} as const satisfies ChangeTargetSubtype
