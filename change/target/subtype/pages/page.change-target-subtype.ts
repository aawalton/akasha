import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const page = {
  id: "01a0d8d6-1488-75c5-a7a7-e80f4ae9e3f5",
  type: "page-type/change-target-subtype",
  slug: "page",
  definition: "any page, whatever that page has",
  changeTargetType: "change-target-type/page",
} as const satisfies ChangeTargetSubtype
