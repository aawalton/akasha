import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EquipmentItemSortOrder = number

export const equipmentItemSortOrder = {
  id: "01a0685c-7d81-78cb-87ee-fb37993f8538",
  pageTypeSlug: "number-property",
  slug: "equipment-item-sort-order",
  propertySlug: "equipment-item-sort-order",
  definition: "where the piece sits when the kit is read as a list",
  max: null,
} as const satisfies NumberProperty
