import type { MasteryLevel } from "../mastery-level.page-type.ts"

export const reader = {
  id: "01a0784a-cdb9-7771-9277-a0697fa6f3aa",
  pageTypeSlug: "mastery-level",
  type: "mastery-level",
  slug: "reader",
  definition: "recognition without generation",
  rank: 1,
  behaviour:
    "Recognizes the terms and claims when prompted — knows *that*. Can follow an explanation but not produce one; comes apart the moment he's off-script. Recognition without generation.",
} as const satisfies MasteryLevel
