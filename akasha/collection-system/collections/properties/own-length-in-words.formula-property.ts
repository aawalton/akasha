import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type OwnLengthInWords = number

export const ownLengthInWords = {
  id: "01a06935-8627-70d9-a39f-333e3535fb22",
  pageTypeSlug: "formula-property",
  slug: "own-length-in-words",
  propertySlug: "own-length-in-words",
  definition: "how much there is to work through on the collection itself, counted in words",
  holds: "number",
  formula: "({own-length} ?? 0) * ({unit-words} ?? 0)",
} as const satisfies FormulaProperty
