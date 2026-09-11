import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const required = {
  id: "01a04df3-6848-79c0-9e0c-aafc52cb12ff",
  type: "boolean-property",
  slug: "required",
  propertySlug: "required",
  definition: "whether a page of this type must have the property",
  types: "ts",
} as const satisfies BooleanProperty
