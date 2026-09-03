import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type LearnLevel = number

export const learnLevel = {
  id: "01a06945-72cd-7005-8084-33cb035cd5c5",
  pageTypeSlug: "formula-property",
  slug: "learn-level",
  propertySlug: "learn-level",
  definition: "which of the four rungs the day's learn points reached",
  holds: "number",
  formula:
    "case({learn-points} >= 2 -> 4, {learn-points} >= 1 -> 3, {learn-points} >= 0.5 -> 2, " +
    "{learn-points} >= 0.25 -> 1, otherwise -> 0)",
} as const satisfies FormulaProperty
