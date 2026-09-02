import type { BooleanProperty } from "../../boolean-property/boolean-property.page-type.ts"

export type Entries = boolean

export const entries = {
  id: "01a05f81-c595-7000-b4d1-783d40d28ec4",
  pageTypeSlug: "boolean-property",
  slug: "entries",
  propertySlug: "entries",
  definition: "whether the values a page carries for this property are kept beside the page",
} as const satisfies BooleanProperty
