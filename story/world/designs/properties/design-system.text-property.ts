import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const designSystem = {
  id: "01a06577-f385-706d-b2ec-adb7723daede",
  type: "page-type/text-property",
  slug: "design-system",
  propertySlug: "system",
  definition: "the rules of a story's world",
  maxLength: 6000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
