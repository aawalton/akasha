import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type AccountActive = boolean

export const accountActive = {
  id: "01a0680a-1a00-7006-a2c8-3e7d5f0c1107",
  pageTypeSlug: "boolean-property",
  slug: "account-active",
  propertySlug: "account-active",
  definition: "whether Monarch still reads an account",
} as const satisfies BooleanProperty
