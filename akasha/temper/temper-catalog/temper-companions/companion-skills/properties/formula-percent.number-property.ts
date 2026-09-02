import type { NumberProperty } from "@akasha/pages-system/number-property"

export type FormulaPercent = number

export const formulaPercent = {
  id: "01a06193-6cac-7317-b005-ded8e4c4ebf5",
  pageTypeSlug: "number-property",
  slug: "formula-percent",
  propertySlug: "percent",
  definition: "the share of a metric an effect reads",
  max: null,
} as const satisfies NumberProperty
