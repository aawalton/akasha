import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type OwnProgressInWords = number

export const ownProgressInWords = {
  id: "01a06935-8627-7b0d-912c-f32a6ddb8a3d",
  pageTypeSlug: "formula-property",
  slug: "own-progress-in-words",
  propertySlug: "own-progress-in-words",
  definition: "how much of the collection itself has been worked through, counted in words",
  holds: "number",
  formula: "({own-progress} ?? 0) * ({unit-words} ?? 0)",
} as const satisfies FormulaProperty
