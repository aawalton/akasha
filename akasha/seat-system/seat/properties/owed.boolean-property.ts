import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type Owed = boolean

export const owed = {
  id: "01a0541c-db62-74f3-a186-6153dda6e130",
  pageTypeSlug: "boolean-property",
  slug: "owed",
  propertySlug: "owed",
  definition: "whether a seat owes its principal an answer",
} as const satisfies BooleanProperty
