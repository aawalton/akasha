import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type LearnStoplight = string

export const learnStoplight = {
  id: "01a06945-72cd-700c-b34a-427f280d4b8c",
  pageTypeSlug: "formula-property",
  slug: "learn-stoplight",
  propertySlug: "learn-stoplight",
  definition: "the rung the day's learn reached, as one colored light",
  holds: "text",
  formula:
    'case({learn-level} == 4 -> "🔵", {learn-level} == 3 -> "🟢", {learn-level} == 2 -> "🟡", ' +
    '{learn-level} == 1 -> "🔴", otherwise -> "⚫")',
} as const satisfies FormulaProperty
