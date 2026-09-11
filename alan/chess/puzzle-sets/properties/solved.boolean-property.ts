import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const solved = {
  id: "01a06582-bd62-7a28-b768-6bf2c654a592",
  type: "boolean-property",
  slug: "solved",
  propertySlug: "solved",
  definition: "whether Alan has answered a puzzle",
  types: "ts",
} as const satisfies BooleanProperty
