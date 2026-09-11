import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const accountActive = {
  id: "01a0680a-1a00-7006-a2c8-3e7d5f0c1107",
  type: "boolean-property",
  slug: "account-active",
  propertySlug: "account-active",
  definition: "whether Monarch still reads an account",
  types: "ts",
} as const satisfies BooleanProperty
