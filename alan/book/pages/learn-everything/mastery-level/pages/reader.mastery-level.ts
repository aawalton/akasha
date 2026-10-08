import type { MasteryLevel } from "akasha/alan/book/pages/learn-everything/mastery-level/mastery-level.page-type.types.ts"

export const reader = {
  id: "01a0784a-cdb9-7771-9277-a0697fa6f3aa",
  type: "page-type/mastery-level",
  slug: "reader",
  definition: "recognition without generation",
  rank: 1,
  behaviour:
    "Recognizes the terms and claims when prompted — knows *that*. Can follow an explanation but not produce one; comes apart the moment he's off-script. Recognition without generation.",
  createdAt: "2026-09-06T19:56:03.385Z",
  updatedAt: "2026-09-15T17:25:57.000Z",
} as const satisfies MasteryLevel
