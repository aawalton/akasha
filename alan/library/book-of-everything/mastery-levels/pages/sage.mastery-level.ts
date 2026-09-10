import type { MasteryLevel } from "../mastery-level.page-type.types.ts"

export const sage = {
  id: "01a0784a-cdb9-7d58-b895-18ea1f2c798a",
  pageTypeSlug: "mastery-level",
  type: "mastery-level",
  slug: "sage",
  definition: "the frontier redrawn",
  rank: 7,
  behaviour: "Defines the frontier — reframes the field and sets the questions others work on.",
} as const satisfies MasteryLevel
