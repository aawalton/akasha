import type { MasteryLevel } from "akasha/alan/library/book-of-everything/mastery-levels/mastery-level.page-type.types.ts"

export const student = {
  id: "01a0784a-cdba-7ea0-ab7d-b3c46eb1c211",
  type: "mastery-level",
  slug: "student",
  definition: "the taught account held and restated",
  rank: 2,
  behaviour:
    "Restates the core in his own words and answers in-distribution questions — holds the standard account. But it's recall of the taught, not transfer: a genuinely novel case stalls him.",
} as const satisfies MasteryLevel
