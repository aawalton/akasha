import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type FaithLevel = number

export const faithLevel = {
  id: "01a06945-72cd-7002-8ce0-502f103c9927",
  pageTypeSlug: "formula-property",
  slug: "faith-level",
  propertySlug: "faith-level",
  definition: "which of the four rungs the day's faith points reached",
  holds: "number",
  formula:
    "case({faith-points} >= 2 -> 4, {faith-points} >= 1 -> 3, {faith-points} >= 0.5 -> 2, " +
    "{faith-points} >= 0.25 -> 1, otherwise -> 0)",
} as const satisfies FormulaProperty
