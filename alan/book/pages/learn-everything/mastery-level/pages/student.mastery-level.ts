import type { MasteryLevel } from "akasha/alan/book/pages/learn-everything/mastery-level/mastery-level.page-type.types.ts"

export const student = {
  id: "01a0784a-cdba-7ea0-ab7d-b3c46eb1c211",
  type: "page-type/mastery-level",
  slug: "student",
  definition: "the taught account held and restated",
  rank: 2,
  behaviour:
    "Restates the core in his own words and answers in-distribution questions — holds the standard account. But it's recall of the taught, not transfer: a genuinely novel case stalls him.",
  createdAt: "2026-09-06T19:56:03.386Z",
  updatedAt: "2026-09-15T17:25:57.000Z",
} as const satisfies MasteryLevel
