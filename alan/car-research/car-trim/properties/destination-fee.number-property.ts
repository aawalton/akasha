import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const destinationFee = {
  id: "01a0c545-b057-7076-bc70-7e3b581a397f",
  type: "page-type/number-property",
  slug: "destination-fee",
  propertySlug: "destination-fee",
  definition: "what the maker charges to ship the car to the dealer, in dollars",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
