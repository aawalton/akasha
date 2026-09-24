import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const countName = {
  id: "01a0d4a9-c418-70e6-87de-167a8de8dc9d",
  type: "page-type/text-property",
  slug: "count-name",
  propertySlug: "count-name",
  definition: "the words a readout's count is named by where a day states no count",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
