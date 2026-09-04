import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Asset = boolean

export const asset = {
  id: "01a0680a-1a00-7005-b743-9f1a2e8b1106",
  pageTypeSlug: "boolean-property",
  slug: "asset",
  propertySlug: "asset",
  definition: "whether an account is money held rather than money owed",
} as const satisfies BooleanProperty
