import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type TotalRemaining = number

export const totalRemaining = {
  id: "01a06935-8628-7614-b82a-a477e00a0233",
  pageTypeSlug: "formula-property",
  slug: "total-remaining",
  propertySlug: "total-remaining",
  definition: "how much of the collection and everything it holds is left to work through",
  holds: "number",
  formula: "({total-remaining-in-words} ?? 0) / {unit-words}",
} as const satisfies FormulaProperty
