import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const defaultBoolean = {
  id: "01a0d925-d415-761d-9c8b-ae9f7b0e8fc0",
  type: "page-type/boolean-property",
  slug: "default-boolean",
  propertySlug: "default-boolean",
  definition: "the default of a property holding true or false",
  types: "ts",
} as const satisfies BooleanProperty
