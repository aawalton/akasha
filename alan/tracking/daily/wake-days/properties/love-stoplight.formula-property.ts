import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type LoveStoplight = string

export const loveStoplight = {
  id: "01a06945-72cd-700a-b401-f56a6322dca2",
  pageTypeSlug: "formula-property",
  slug: "love-stoplight",
  propertySlug: "love-stoplight",
  definition: "the rung the day's love reached, as one colored light",
  holds: "text",
  formula:
    'case({love-level} == 4 -> "🔵", {love-level} == 3 -> "🟢", {love-level} == 2 -> "🟡", ' +
    '{love-level} == 1 -> "🔴", otherwise -> "⚫")',
} as const satisfies FormulaProperty
