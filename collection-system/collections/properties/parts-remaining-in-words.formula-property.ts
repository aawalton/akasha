import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type PartsRemainingInWords = number

export const partsRemainingInWords = {
  id: "01a06935-8627-7bf2-b209-a2157551806a",
  pageTypeSlug: "formula-property",
  slug: "parts-remaining-in-words",
  propertySlug: "parts-remaining-in-words",
  definition: "how much of everything the collection holds is left to work through",
  holds: "number",
  formula: "({parts-length-in-words} ?? 0) - ({parts-progress-in-words} ?? 0)",
} as const satisfies FormulaProperty
