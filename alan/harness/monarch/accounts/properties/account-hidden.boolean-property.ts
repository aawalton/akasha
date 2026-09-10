import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type AccountHidden = boolean

export const accountHidden = {
  id: "01a0680a-1a00-7007-97b1-4c8e6a2d1108",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "account-hidden",
  propertySlug: "account-hidden",
  definition: "whether Monarch keeps an account out of its own totals",
} as const satisfies BooleanProperty
