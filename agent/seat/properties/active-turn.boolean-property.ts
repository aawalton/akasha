import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const activeTurn = {
  id: "01a06c75-5eaa-731c-a8c6-a080637acf50",
  type: "page-type/boolean-property",
  slug: "active-turn",
  propertySlug: "active-turn",
  definition: "whether a seat is working",
  types: "ts",
} as const satisfies BooleanProperty
