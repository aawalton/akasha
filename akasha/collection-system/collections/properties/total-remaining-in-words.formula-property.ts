import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type TotalRemainingInWords = number

export const totalRemainingInWords = {
  id: "01a06935-8628-7d01-9cf6-30c3c0bf669b",
  pageTypeSlug: "formula-property",
  slug: "total-remaining-in-words",
  propertySlug: "total-remaining-in-words",
  definition: "how much of the collection and everything it holds is left to work through",
  formula: "({total-length-in-words} ?? 0) - ({total-progress-in-words} ?? 0)",
} as const satisfies FormulaProperty
