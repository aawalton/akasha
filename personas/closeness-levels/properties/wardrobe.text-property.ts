import type { TextProperty } from "@akasha/pages/text-property"

export type Wardrobe = string

export const wardrobe = {
  id: "01a0540e-5114-7d84-a429-e283fe90a3de",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "wardrobe",
  propertySlug: "wardrobe",
  definition: "what a persona wears at a rung",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
