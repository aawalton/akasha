import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type TotalProgress = number

export const totalProgress = {
  id: "01a06935-8628-78b8-85c4-4908cf7c9554",
  pageTypeSlug: "formula-property",
  slug: "total-progress",
  propertySlug: "total-progress",
  definition: "how much of the collection and everything it holds has been worked through",
  formula: "({total-progress-in-words} ?? 0) / {unit-words}",
} as const satisfies FormulaProperty
