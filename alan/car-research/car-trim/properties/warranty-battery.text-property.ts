import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const warrantyBattery = {
  id: "01a0c544-67de-7e6b-a525-f879f07e1cd2",
  type: "page-type/text-property",
  slug: "warranty-battery",
  propertySlug: "warranty-battery",
  definition: "how long and how far the maker covers the traction battery",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
