import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type WordsReadPoints = number

export const wordsReadPoints = {
  id: "01a05fd8-c30f-71d3-9cc5-e838170dd777",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "words-read-points",
  propertySlug: "words-read-points",
  definition: "the reading earned on a day",
  max: null,
} as const satisfies NumberProperty
