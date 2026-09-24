import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const lorePinQc = {
  id: "01a0d5da-b5a1-77d3-8023-16a57acaa9d5",
  type: "page-type/boolean-property",
  slug: "lore-pin-qc",
  propertySlug: "qc",
  definition: "the LoreBooks table's `qc` mark on a place, which nothing in Temper reads",
  types: "ts",
} as const satisfies BooleanProperty
