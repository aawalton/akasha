import type { MasteryLevel } from "akasha/alan/book/pages/learn-everything/mastery-level/mastery-level.page-type.types.ts"

export const novice = {
  id: "01a0784a-cdb9-712b-92b7-870090825441",
  type: "page-type/mastery-level",
  slug: "novice",
  definition: "no foothold in a field",
  rank: 0,
  behaviour:
    "No foothold. The vocabulary cues nothing; he can't engage the field at all. Pre-recognition.",
  createdAt: "2026-09-06T19:56:03.385Z",
  updatedAt: "2026-09-15T17:25:57.000Z",
} as const satisfies MasteryLevel
