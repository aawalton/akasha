import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Wardrobe = string

export const wardrobe = {
  id: "01a0540e-5114-7d84-a429-e283fe90a3de",
  pageTypeSlug: "text-property",
  slug: "wardrobe",
  propertySlug: "wardrobe",
  definition: "what a persona wears at a rung",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
