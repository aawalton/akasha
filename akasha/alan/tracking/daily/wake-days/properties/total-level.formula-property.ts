import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type TotalLevel = number

export const totalLevel = {
  id: "01a06945-72cd-7008-9aa8-3d84220f3b17",
  pageTypeSlug: "formula-property",
  slug: "total-level",
  propertySlug: "total-level",
  definition: "which of the four rungs the day's six values reached between them",
  holds: "number",
  formula:
    "case({faith-level} + {love-level} + {health-level} + {learn-level} + {fun-level} + " +
    "{wealth-level} >= 24 -> 4, {faith-level} + {love-level} + {health-level} + {learn-level} " +
    "+ {fun-level} + {wealth-level} >= 18 -> 3, {faith-level} + {love-level} + {health-level} " +
    "+ {learn-level} + {fun-level} + {wealth-level} >= 12 -> 2, {faith-level} + {love-level} " +
    "+ {health-level} + {learn-level} + {fun-level} + {wealth-level} >= 6 -> 1, otherwise -> " +
    "0)",
} as const satisfies FormulaProperty
