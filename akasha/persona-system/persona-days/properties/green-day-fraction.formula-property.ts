import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type GreenDayFraction = number

export const greenDayFraction = {
  id: "01a06553-4713-7005-821a-9ad802710d69",
  pageTypeSlug: "formula-property",
  slug: "green-day-fraction",
  propertySlug: "green-day-fraction",
  definition: "how far toward green a day got, as a fraction of one",
  holds: "number",
  formula: "case({green-day-points} > 0 -> ({points} ?? 0) / {green-day-points}, otherwise -> 0)",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day whose bar is nothing draws no fraction rather than an endless one.",
    },
  ],
} as const satisfies FormulaProperty
