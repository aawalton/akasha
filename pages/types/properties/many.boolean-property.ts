import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.types.ts"

export const many = {
  id: "01a04df3-6848-7846-a364-4343fd549e45",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "many",
  propertySlug: "many",
  definition: "whether a page of this type carries more than one of the property",
  types: "ts",
} as const satisfies BooleanProperty
