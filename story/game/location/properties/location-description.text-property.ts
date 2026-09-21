import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const locationDescription = {
  id: "01a0c644-2208-7cea-b489-fe1d6c5fad9e",
  type: "page-type/text-property",
  slug: "location-description",
  propertySlug: "description",
  definition: "what a place is like to be in",
  maxLength: 2000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
