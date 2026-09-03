import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type TotalProgressInWords = number

export const totalProgressInWords = {
  id: "01a06935-8628-7f18-b24f-5c64c71fd00f",
  pageTypeSlug: "formula-property",
  slug: "total-progress-in-words",
  propertySlug: "total-progress-in-words",
  definition: "how much of the collection and everything it holds has been worked through",
  holds: "number",
  formula: "({own-progress-in-words} ?? 0) + ({parts-progress-in-words} ?? 0)",
} as const satisfies FormulaProperty
