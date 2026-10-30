import type { MasteryLevel } from "akasha/alan/book/pages/learn-everything/mastery-level/mastery-level.page-type.types.ts"

export const scholar = {
  id: "01a0784a-cdb9-7a08-987d-f49f5a6368b3",
  type: "page-type/mastery-level",
  slug: "scholar",
  definition: "the mastery level where Alan can solve a new problem in a learn everything topic",
  rank: 3,
  behaviour:
    "Derives consequences and handles novel in-field cases from the core — reconstructs rather than recalls, explains why not just what. The model has become generative.",
  createdAt: "2026-09-06T19:56:03.385Z",
  updatedAt: "2026-10-30T14:56:47.879Z",
} as const satisfies MasteryLevel
