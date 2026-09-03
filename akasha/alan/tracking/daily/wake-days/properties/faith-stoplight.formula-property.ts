import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type FaithStoplight = text

export const faithStoplight = {
  id: "01a06945-72cd-7009-b2fa-9da06ad12b46",
  pageTypeSlug: "formula-property",
  slug: "faith-stoplight",
  propertySlug: "faith-stoplight",
  definition: "the rung the day's faith reached, as one colored light",
  formula:
    'case({faith-level} == 4 -> "🔵", {faith-level} == 3 -> "🟢", {faith-level} == 2 -> "🟡", ' +
    '{faith-level} == 1 -> "🔴", otherwise -> "⚫")',
} as const satisfies FormulaProperty
