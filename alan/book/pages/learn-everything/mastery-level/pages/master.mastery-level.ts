import type { MasteryLevel } from "akasha/alan/book/pages/learn-everything/mastery-level/mastery-level.page-type.types.ts"

export const master = {
  id: "01a0784a-cdb9-7d81-8f89-5d3165f75722",
  type: "page-type/mastery-level",
  slug: "master",
  definition:
    "the mastery level where Alan knows the unsolved problems of a learn everything topic",
  rank: 5,
  behaviour:
    "Sees the frontier: knows the open problems and the limits of current knowledge, and can tell a settled question from a live one.",
  createdAt: "2026-09-06T19:56:03.385Z",
  updatedAt: "2026-10-30T14:55:21.342Z",
} as const satisfies MasteryLevel
