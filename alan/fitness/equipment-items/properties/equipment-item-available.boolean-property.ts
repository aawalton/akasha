import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type EquipmentItemAvailable = boolean

export const equipmentItemAvailable = {
  id: "01a0685c-7d81-7799-94db-5da2d37a3fce",
  pageTypeSlug: "boolean-property",
  slug: "equipment-item-available",
  propertySlug: "equipment-item-available",
  definition: "whether Alan owns the piece rather than only wanting it",
} as const satisfies BooleanProperty
