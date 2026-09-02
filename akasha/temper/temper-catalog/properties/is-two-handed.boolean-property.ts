import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsTwoHanded = boolean

export const isTwoHanded = {
  id: "01a05fba-ce3a-7907-b75d-4f6cb98b399f",
  pageTypeSlug: "boolean-property",
  slug: "is-two-handed",
  propertySlug: "is-two-handed",
  definition: "whether a weapon takes both hands",
} as const satisfies BooleanProperty
