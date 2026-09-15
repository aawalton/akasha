import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const accountHidden = {
  id: "01a0680a-1a00-7007-97b1-4c8e6a2d1108",
  type: "page-type/boolean-property",
  slug: "account-hidden",
  propertySlug: "account-hidden",
  definition: "whether Monarch keeps an account out of its own totals",
  types: "ts",
} as const satisfies BooleanProperty
