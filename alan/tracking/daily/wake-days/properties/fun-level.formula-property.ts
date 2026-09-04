import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type FunLevel = number

export const funLevel = {
  id: "01a06945-72cd-7006-9aa2-dd41200cda10",
  pageTypeSlug: "formula-property",
  slug: "fun-level",
  propertySlug: "fun-level",
  definition: "which of the four rungs the day's fun points reached",
  holds: "number",
  formula:
    "case({fun-points} >= 2 -> 4, {fun-points} >= 1 -> 3, {fun-points} >= 0.5 -> 2, " +
    "{fun-points} >= 0.25 -> 1, otherwise -> 0)",
} as const satisfies FormulaProperty
