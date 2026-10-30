import type { MasteryLevel } from "akasha/alan/book/pages/learn-everything/mastery-level/mastery-level.page-type.types.ts"

export const sage = {
  id: "01a0784a-cdb9-7d58-b895-18ea1f2c798a",
  type: "page-type/mastery-level",
  slug: "sage",
  definition: "the mastery level where Alan chooses the problems that people work on",
  rank: 7,
  behaviour: "Defines the frontier — reframes the field and sets the questions others work on.",
  createdAt: "2026-09-06T19:56:03.385Z",
  updatedAt: "2026-10-30T14:56:20.099Z",
} as const satisfies MasteryLevel
