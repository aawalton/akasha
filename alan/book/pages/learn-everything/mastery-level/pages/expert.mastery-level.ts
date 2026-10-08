import type { MasteryLevel } from "akasha/alan/book/pages/learn-everything/mastery-level/mastery-level.page-type.types.ts"

export const expert = {
  id: "01a0784a-cdb9-786f-883a-2ead5cdc4454",
  type: "page-type/mastery-level",
  slug: "expert",
  definition: "fluency across a whole field",
  rank: 4,
  behaviour:
    "Fluent across the whole field — edge cases, failure modes, where the bodies are buried; can teach it. A compact, well-integrated model with few surprises left inside it.",
  createdAt: "2026-09-06T19:56:03.385Z",
  updatedAt: "2026-09-15T17:25:57.000Z",
} as const satisfies MasteryLevel
