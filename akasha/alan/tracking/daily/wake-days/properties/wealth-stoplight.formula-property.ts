import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type WealthStoplight = string

export const wealthStoplight = {
  id: "01a06945-72cd-700e-9a1d-b4bb3924f61b",
  pageTypeSlug: "formula-property",
  slug: "wealth-stoplight",
  propertySlug: "wealth-stoplight",
  definition: "the rung the day's wealth reached, as one colored light",
  formula:
    'case({wealth-level} == 4 -> "🔵", {wealth-level} == 3 -> "🟢", {wealth-level} == 2 -> ' +
    '"🟡", {wealth-level} == 1 -> "🔴", otherwise -> "⚫")',
} as const satisfies FormulaProperty
