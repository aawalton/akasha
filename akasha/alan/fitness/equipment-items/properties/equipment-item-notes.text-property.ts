import type { TextProperty } from "@akasha/pages-system/text-property"

export type EquipmentItemNotes = string

export const equipmentItemNotes = {
  id: "01a06865-c57f-71d7-a465-f4e483cb2ca4",
  pageTypeSlug: "text-property",
  slug: "equipment-item-notes",
  propertySlug: "equipment-item-notes",
  definition: "what is worth knowing about the piece that its other fields do not say",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
