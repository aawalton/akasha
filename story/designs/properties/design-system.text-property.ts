import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const designSystem = {
  id: "01a06577-f385-706d-b2ec-adb7723daede",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "design-system",
  propertySlug: "system",
  definition: "the rules a story's world runs on",
  maxLength: 6000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
