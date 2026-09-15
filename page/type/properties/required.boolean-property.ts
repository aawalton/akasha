import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const required = {
  id: "01a04df3-6848-79c0-9e0c-aafc52cb12ff",
  type: "page-type/boolean-property",
  slug: "required",
  propertySlug: "required",
  definition: "whether a page of this type must have the property",
  types: "ts",
} as const satisfies BooleanProperty
