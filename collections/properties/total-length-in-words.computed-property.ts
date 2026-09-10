import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export type TotalLengthInWords = number

export const totalLengthInWords = {
  id: "01a07231-dd66-7734-a15d-591fa75f5b2d",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "total-length-in-words",
  propertySlug: "total-length-in-words",
  definition: "how much there is to work through in the collection and everything it holds",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
