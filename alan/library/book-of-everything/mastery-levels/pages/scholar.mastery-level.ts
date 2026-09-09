import type { MasteryLevel } from "../mastery-level.page-type.ts"

export const scholar = {
  id: "01a0784a-cdb9-7a08-987d-f49f5a6368b3",
  pageTypeSlug: "mastery-level",
  type: "mastery-level",
  slug: "scholar",
  definition: "a model that generates rather than recalls",
  rank: 3,
  behaviour:
    "Derives consequences and handles novel in-field cases from the core — reconstructs rather than recalls, explains why not just what. The model has become generative.",
} as const satisfies MasteryLevel
