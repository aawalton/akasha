import type { BooleanProperty } from "../../page-property/boolean-property.page-type.ts"

export type Many = boolean

export const many = {
  id: "01a04df3-6848-7846-a364-4343fd549e45",
  pageTypeSlug: "boolean-property",
  slug: "many",
  definition: "whether a page of this type carries more than one of the property",
} as const satisfies BooleanProperty
