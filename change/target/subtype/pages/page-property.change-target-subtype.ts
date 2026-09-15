import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const pageProperty = {
  id: "01a09c6c-2dfc-70d1-9cdd-955a059f6647",
  type: "page-type/change-target-subtype",
  slug: "page-property",
  definition: "any page property, whatever that property has",
  changeTargetType: "change-target-type/page-property",
} as const satisfies ChangeTargetSubtype
