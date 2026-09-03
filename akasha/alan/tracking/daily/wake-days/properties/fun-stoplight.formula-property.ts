import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type FunStoplight = string

export const funStoplight = {
  id: "01a06945-72cd-700d-8a92-31da35500322",
  pageTypeSlug: "formula-property",
  slug: "fun-stoplight",
  propertySlug: "fun-stoplight",
  definition: "the rung the day's fun reached, as one colored light",
  formula:
    'case({fun-level} == 4 -> "🔵", {fun-level} == 3 -> "🟢", {fun-level} == 2 -> "🟡", ' +
    '{fun-level} == 1 -> "🔴", otherwise -> "⚫")',
} as const satisfies FormulaProperty
