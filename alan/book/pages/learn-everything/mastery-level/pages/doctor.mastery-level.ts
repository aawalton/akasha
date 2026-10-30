import type { MasteryLevel } from "akasha/alan/book/pages/learn-everything/mastery-level/mastery-level.page-type.types.ts"

export const doctor = {
  id: "01a0784a-cdb9-7f1a-9941-bd4f4802ffe5",
  type: "page-type/mastery-level",
  slug: "doctor",
  definition: "the mastery level where Alan adds new knowledge to a learn everything topic",
  rank: 6,
  behaviour:
    "Contributes to the frontier — produces novel, defensible results or syntheses that move it.",
  createdAt: "2026-09-06T19:56:03.385Z",
  updatedAt: "2026-10-30T14:54:38.595Z",
} as const satisfies MasteryLevel
