import type { MasteryLevel } from "../mastery-level.page-type.ts"

export const novice = {
  id: "01a0784a-cdb9-712b-92b7-870090825441",
  pageTypeSlug: "mastery-level",
  type: "mastery-level",
  slug: "novice",
  definition: "no foothold in a field",
  rank: 0,
  behaviour:
    "No foothold. The vocabulary cues nothing; he can't engage the field at all. Pre-recognition.",
} as const satisfies MasteryLevel
