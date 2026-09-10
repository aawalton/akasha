import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const activeTurn = {
  id: "01a06c75-5eaa-731c-a8c6-a080637acf50",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "active-turn",
  propertySlug: "active-turn",
  definition: "whether a seat is between a prompt and the end of its answer",
  types: "ts",
} as const satisfies BooleanProperty
