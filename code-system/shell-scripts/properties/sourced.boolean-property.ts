import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type Sourced = boolean

export const sourced = {
  id: "01a05946-fd29-7ffb-9523-f90fe2664c6a",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "sourced",
  propertySlug: "sourced",
  definition: "whether a script is read into another's run",
} as const satisfies BooleanProperty
