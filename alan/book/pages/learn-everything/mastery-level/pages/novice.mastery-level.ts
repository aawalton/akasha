import type { MasteryLevel } from "akasha/alan/book/pages/learn-everything/mastery-level/mastery-level.page-type.types.ts"

export const novice = {
  id: "01a0784a-cdb9-712b-92b7-870090825441",
  type: "page-type/mastery-level",
  slug: "novice",
  definition: "the mastery level where Alan knows no word of a learn everything topic",
  rank: 0,
  behaviour:
    "No foothold. The vocabulary cues nothing; he can't engage the field at all. Pre-recognition.",
  createdAt: "2026-09-06T19:56:03.385Z",
  updatedAt: "2026-10-30T14:55:43.564Z",
} as const satisfies MasteryLevel
