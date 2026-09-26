import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const equipmentIconName = {
  id: "01a0df4d-8886-70d7-9e40-ac79906aec3c",
  type: "page-type/text-property",
  slug: "equipment-icon-name",
  propertySlug: "equipment-icon-name",
  definition: "the name the game's companion equipment art gives a slot or a weapon",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
