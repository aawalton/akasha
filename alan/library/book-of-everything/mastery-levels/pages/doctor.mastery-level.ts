import type { MasteryLevel } from "akasha/alan/library/book-of-everything/mastery-levels/mastery-level.page-type.types.ts"

export const doctor = {
  id: "01a0784a-cdb9-7f1a-9941-bd4f4802ffe5",
  type: "mastery-level",
  slug: "doctor",
  definition: "a contribution to the frontier",
  rank: 6,
  behaviour:
    "Contributes to the frontier — produces novel, defensible results or syntheses that move it.",
} as const satisfies MasteryLevel
