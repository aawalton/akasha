import type { TextProperty } from "@akasha/pages-system/text-property"

export type DesignSystem = string

export const designSystem = {
  id: "01a06577-f385-706d-b2ec-adb7723daede",
  pageTypeSlug: "text-property",
  slug: "design-system",
  propertySlug: "system",
  definition: "the rules a story's world runs on",
  max: 6000,
  nameFormatSlug: null,
} as const satisfies TextProperty
