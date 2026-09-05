import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type OwnRemainingInWords = number

export const ownRemainingInWords = {
  id: "01a07231-dd65-7362-baa2-75438c15234d",
  pageTypeSlug: "computed-property",
  slug: "own-remaining-in-words",
  propertySlug: "own-remaining-in-words",
  definition: "how much of the collection itself is left to work through, counted in words",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
