import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type HealthLevel = number

export const healthLevel = {
  id: "01a06945-72cd-7004-8715-f8efc083735f",
  pageTypeSlug: "formula-property",
  slug: "health-level",
  propertySlug: "health-level",
  definition: "which of the four rungs the day's health points reached",
  holds: "number",
  formula:
    "case({health-points} >= 2 -> 4, {health-points} >= 1 -> 3, {health-points} >= 0.5 -> 2, " +
    "{health-points} >= 0.25 -> 1, otherwise -> 0)",
} as const satisfies FormulaProperty
