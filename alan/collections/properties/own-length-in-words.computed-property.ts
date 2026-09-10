import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export type OwnLengthInWords = number

export const ownLengthInWords = {
  id: "01a07231-dd64-7de6-9bf2-d8ac9ec72972",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "own-length-in-words",
  propertySlug: "own-length-in-words",
  definition: "how much there is to work through on the collection itself, counted in words",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
