import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type WealthLevel = number

export const wealthLevel = {
  id: "01a06945-72cd-7007-802a-149548fe8df8",
  pageTypeSlug: "formula-property",
  slug: "wealth-level",
  propertySlug: "wealth-level",
  definition: "which of the four rungs the day's wealth points reached",
  formula:
    "case({wealth-points} >= 2 -> 4, {wealth-points} >= 1 -> 3, {wealth-points} >= 0.5 -> 2, " +
    "{wealth-points} >= 0.25 -> 1, otherwise -> 0)",
} as const satisfies FormulaProperty
