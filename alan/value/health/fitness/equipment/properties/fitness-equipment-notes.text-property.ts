import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const fitnessEquipmentNotes = {
  id: "01a06865-7f45-7b7d-acf1-809958ddf1f2",
  type: "page-type/text-property",
  slug: "fitness-equipment-notes",
  propertySlug: "notes",
  definition: "what is worth knowing about a piece of kit beyond its numbers",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
