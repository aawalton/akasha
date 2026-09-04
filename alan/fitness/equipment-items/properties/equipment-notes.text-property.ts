import type { TextProperty } from "@akasha/pages-system/text-property"

export type EquipmentNotes = string

export const equipmentNotes = {
  id: "01a06865-7f45-7b7d-acf1-809958ddf1f2",
  pageTypeSlug: "text-property",
  slug: "equipment-notes",
  propertySlug: "notes",
  definition: "what is worth knowing about a piece of kit beyond its numbers",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty
