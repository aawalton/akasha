import type { MasteryLevel } from "akasha/alan/book/pages/learn-everything/mastery-level/mastery-level.page-type.types.ts"

export const student = {
  id: "01a0784a-cdba-7ea0-ab7d-b3c46eb1c211",
  type: "page-type/mastery-level",
  slug: "student",
  definition: "the mastery level where Alan can restate a learn everything topic",
  rank: 2,
  behaviour:
    "Restates the core in his own words and answers in-distribution questions — holds the standard account. But it's recall of the taught, not transfer: a genuinely novel case stalls him.",
  createdAt: "2026-09-06T19:56:03.386Z",
  updatedAt: "2026-10-30T14:57:19.641Z",
} as const satisfies MasteryLevel
