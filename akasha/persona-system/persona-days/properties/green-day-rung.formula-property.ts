import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type GreenDayRung = number

export const greenDayRung = {
  id: "01a06553-4713-7006-b9f4-5ff2867d1c10",
  pageTypeSlug: "formula-property",
  slug: "green-day-rung",
  propertySlug: "green-day-rung",
  definition: "the rung of the green day scale a day reached",
  holds: "number",
  formula:
    "case({green-day-fraction} >= 2 -> 2, {green-day-fraction} >= 1 -> 1, " +
    "{green-day-fraction} >= 0.5 -> 0.5, {green-day-fraction} >= 0.25 -> 0.25, otherwise -> 0)",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung is what a value's green day units are summed from.",
    },
  ],
} as const satisfies FormulaProperty
