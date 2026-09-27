import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const championConstellation = {
  id: "01a0e135-d98c-7a82-88f8-947f5438cf2c",
  type: "page-type/text-property",
  slug: "champion-constellation",
  propertySlug: "champion-constellation",
  definition: "the constellation a champion star sits in: craft, fitness or warfare",
  maxLength: 20,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
