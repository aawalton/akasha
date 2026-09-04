import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type LoveLevel = number

export const loveLevel = {
  id: "01a06945-72cd-7003-9a1f-48abfff120a9",
  pageTypeSlug: "formula-property",
  slug: "love-level",
  propertySlug: "love-level",
  definition: "which of the four rungs the day's love points reached",
  holds: "number",
  formula:
    "case({love-points} >= 2 -> 4, {love-points} >= 1 -> 3, {love-points} >= 0.5 -> 2, " +
    "{love-points} >= 0.25 -> 1, otherwise -> 0)",
} as const satisfies FormulaProperty
