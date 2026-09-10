import type { MasteryLevel } from "../mastery-level.page-type.types.ts"

export const master = {
  id: "01a0784a-cdb9-7d81-8f89-5d3165f75722",
  pageTypeSlug: "mastery-level",
  type: "mastery-level",
  slug: "master",
  definition: "sight of the frontier",
  rank: 5,
  behaviour:
    "Sees the frontier: knows the open problems and the limits of current knowledge, and can tell a settled question from a live one.",
} as const satisfies MasteryLevel
