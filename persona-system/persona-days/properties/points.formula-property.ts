import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type Points = number

export const points = {
  id: "01a06553-4713-7004-b3af-588d32b4785b",
  pageTypeSlug: "formula-property",
  slug: "points",
  propertySlug: "points",
  definition: "everything a day earned, across every pillar, as one number",
  holds: "number",
  formula:
    "({sleep-points} ?? 0) + ({strength-points} ?? 0) + ({cardio-points} ?? 0) + ({nutrition-points} ?? 0) + ({task-points} ?? 0) + ({breathing-points} ?? 0) + ({source-points} ?? 0)",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pillar a day states nothing for counts as nothing.",
    },
  ],
} as const satisfies FormulaProperty
