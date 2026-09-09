import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const dayCompletions = {
  id: "01a072fc-7da3-75a0-8778-f8e29a144fe0",
  pageTypeSlug: "module",
  type: "module",
  slug: "day-completions",
  definition: "the rounds of a to-do Alan finished, read as rows beside the day each fell on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Completions are read over a span rather than for one day.",
    },
    {
      invariantKind: "departure",
      statement: "An ESO day lies across two opened days, and both are read.",
    },
    {
      invariantKind: "departure",
      statement: "A completion's own instant decides which day that completion fell in.",
    },
  ],
} as const satisfies Module
