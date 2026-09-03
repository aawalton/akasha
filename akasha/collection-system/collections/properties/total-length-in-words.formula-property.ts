import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type TotalLengthInWords = number

export const totalLengthInWords = {
  id: "01a06935-8628-7af8-b6c9-82301d73a620",
  pageTypeSlug: "formula-property",
  slug: "total-length-in-words",
  propertySlug: "total-length-in-words",
  definition: "how much there is to work through in the collection and everything it holds",
  formula: "({own-length-in-words} ?? 0) + ({parts-length-in-words} ?? 0)",
} as const satisfies FormulaProperty
