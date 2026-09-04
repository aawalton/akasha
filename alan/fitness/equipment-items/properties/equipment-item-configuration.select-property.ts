import type { SelectProperty } from "@akasha/pages-system/select-property"

export const equipmentItemConfiguration = {
  id: "01a0685c-7d81-7e9d-9c69-e6d3ec797c49",
  pageTypeSlug: "select-property",
  slug: "equipment-item-configuration",
  propertySlug: "equipment-item-configuration",
  definition: "how many of the piece there are and whether the load on it moves",
  values: ["pair", "single", "adjustable", "n-a"],
} as const satisfies SelectProperty

export type EquipmentItemConfiguration = (typeof equipmentItemConfiguration.values)[number]
