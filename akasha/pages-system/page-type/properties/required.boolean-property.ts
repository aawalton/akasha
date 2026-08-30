import type { BooleanProperty } from "../../boolean-property/boolean-property.page-type.ts"

export type Required = boolean

export const required = {
  id: "01a04df3-6848-79c0-9e0c-aafc52cb12ff",
  pageTypeSlug: "boolean-property",
  slug: "required",
  propertySlug: "required",
  definition: "whether a page of this type must carry the property",
} as const satisfies BooleanProperty
