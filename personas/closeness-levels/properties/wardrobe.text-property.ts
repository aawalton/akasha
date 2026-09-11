import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const wardrobe = {
  id: "01a0540e-5114-7d84-a429-e283fe90a3de",
  type: "text-property",
  slug: "wardrobe",
  propertySlug: "wardrobe",
  definition: "what a persona wears at a rung",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
