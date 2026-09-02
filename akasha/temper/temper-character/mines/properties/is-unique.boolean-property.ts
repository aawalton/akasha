import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsUnique = boolean

export const isUnique = {
  id: "01a05fcd-f54f-7e52-9fe0-e33a56ea82cc",
  pageTypeSlug: "boolean-property",
  slug: "is-unique",
  propertySlug: "is-unique",
  definition: "whether only one of an item may be owned",
} as const satisfies BooleanProperty
