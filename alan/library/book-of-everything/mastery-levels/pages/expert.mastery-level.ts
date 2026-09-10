import type { MasteryLevel } from "../mastery-level.page-type.types.ts"

export const expert = {
  id: "01a0784a-cdb9-786f-883a-2ead5cdc4454",
  pageTypeSlug: "mastery-level",
  type: "mastery-level",
  slug: "expert",
  definition: "fluency across a whole field",
  rank: 4,
  behaviour:
    "Fluent across the whole field — edge cases, failure modes, where the bodies are buried; can teach it. A compact, well-integrated model with few surprises left inside it.",
} as const satisfies MasteryLevel
