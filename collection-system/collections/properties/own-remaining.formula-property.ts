import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type OwnRemaining = number

export const ownRemaining = {
  id: "01a06935-8627-73ac-b22e-1f3d55541df2",
  pageTypeSlug: "formula-property",
  slug: "own-remaining",
  propertySlug: "own-remaining",
  definition: "how much of the collection itself is left to work through",
  holds: "number",
  formula: "({own-length} ?? 0) - ({own-progress} ?? 0)",
} as const satisfies FormulaProperty
