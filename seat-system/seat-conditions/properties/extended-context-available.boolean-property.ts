import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type ExtendedContextAvailable = boolean

export const extendedContextAvailable = {
  id: "01a06861-f664-7047-91d7-8edb290cef14",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "extended-context-available",
  propertySlug: "extended-context-available",
  definition: "whether a seat may take the longer context window",
} as const satisfies BooleanProperty
