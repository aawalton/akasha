import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const warrantyPowertrain = {
  id: "01a0c544-7860-7421-8781-a7cd3d406d1d",
  type: "page-type/text-property",
  slug: "warranty-powertrain",
  propertySlug: "warranty-powertrain",
  definition: "how long and how far the maker covers what moves the car",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
