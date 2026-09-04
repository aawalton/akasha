import type { TextProperty } from "@akasha/pages-system/text-property"

export type EquipmentItemLoads = string

export const equipmentItemLoads = {
  id: "01a0685c-7d81-7581-84fb-01633f45cea9",
  pageTypeSlug: "text-property",
  slug: "equipment-item-loads",
  propertySlug: "equipment-item-loads",
  definition: "the weights in pounds the piece can be set to, said in order and parted by commas",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
