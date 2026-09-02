import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Locked = boolean

export const locked = {
  id: "01a06053-b380-70ca-a7e1-de2fc777700b",
  pageTypeSlug: "boolean-property",
  slug: "locked",
  propertySlug: "locked",
  definition: "whether an item is held back from being sold or destroyed",
} as const satisfies BooleanProperty
