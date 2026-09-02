import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Bound = boolean

export const bound = {
  id: "01a06053-b37c-78e9-93a9-c755ee269037",
  pageTypeSlug: "boolean-property",
  slug: "bound",
  propertySlug: "bound",
  definition: "whether an item is tied to the account holding the item",
} as const satisfies BooleanProperty
