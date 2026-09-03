import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type TotalLength = number

export const totalLength = {
  id: "01a06935-8628-7b5d-851b-e501155afe6d",
  pageTypeSlug: "formula-property",
  slug: "total-length",
  propertySlug: "total-length",
  definition: "how much there is to work through in the collection and everything it holds",
  formula: "({total-length-in-words} ?? 0) / {unit-words}",
} as const satisfies FormulaProperty
