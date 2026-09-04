import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type ActiveTurn = boolean

export const activeTurn = {
  id: "01a06c75-5eaa-731c-a8c6-a080637acf50",
  pageTypeSlug: "boolean-property",
  slug: "active-turn",
  propertySlug: "active-turn",
  definition: "whether a seat is between a prompt and the end of its answer",
} as const satisfies BooleanProperty
