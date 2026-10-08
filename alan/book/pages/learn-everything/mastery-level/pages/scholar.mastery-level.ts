import type { MasteryLevel } from "akasha/alan/book/pages/learn-everything/mastery-level/mastery-level.page-type.types.ts"

export const scholar = {
  id: "01a0784a-cdb9-7a08-987d-f49f5a6368b3",
  type: "page-type/mastery-level",
  slug: "scholar",
  definition: "a model that generates rather than recalls",
  rank: 3,
  behaviour:
    "Derives consequences and handles novel in-field cases from the core — reconstructs rather than recalls, explains why not just what. The model has become generative.",
  createdAt: "2026-09-06T19:56:03.385Z",
  updatedAt: "2026-09-15T17:25:57.000Z",
} as const satisfies MasteryLevel
