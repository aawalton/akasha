import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const driverAssistBrand = {
  id: "01a0c543-9c04-7ab3-afb2-c9d738adde46",
  type: "page-type/text-property",
  slug: "driver-assist-brand",
  propertySlug: "driver-assist-brand",
  definition: "the maker's name for its driver assistance",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
