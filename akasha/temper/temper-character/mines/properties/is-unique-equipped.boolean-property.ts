import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsUniqueEquipped = boolean

export const isUniqueEquipped = {
  id: "01a05fcd-f550-7988-b8c3-38d1296b72da",
  pageTypeSlug: "boolean-property",
  slug: "is-unique-equipped",
  propertySlug: "is-unique-equipped",
  definition: "whether only one of an item may be worn at once",
} as const satisfies BooleanProperty
