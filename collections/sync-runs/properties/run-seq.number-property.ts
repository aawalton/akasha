import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type RunSeq = number

export const runSeq = {
  id: "01a06861-f664-7c01-8a3b-11d2a4e70001",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "run-seq",
  propertySlug: "run-seq",
  definition: "the place a pull takes in the order pulls were written",
  max: null,
} as const satisfies NumberProperty
