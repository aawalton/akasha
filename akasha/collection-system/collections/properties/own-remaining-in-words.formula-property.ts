import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type OwnRemainingInWords = number

export const ownRemainingInWords = {
  id: "01a06935-8627-78eb-8bb4-b654e259e704",
  pageTypeSlug: "formula-property",
  slug: "own-remaining-in-words",
  propertySlug: "own-remaining-in-words",
  definition: "how much of the collection itself is left to work through, counted in words",
  formula: "({own-length-in-words} ?? 0) - ({own-progress-in-words} ?? 0)",
} as const satisfies FormulaProperty
