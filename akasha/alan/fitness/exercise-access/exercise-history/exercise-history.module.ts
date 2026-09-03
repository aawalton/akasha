import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const exerciseHistory = {
  id: "01a0685c-7d81-78d3-ad61-033e43fb5cdb",
  pageTypeSlug: "module",
  slug: "exercise-history",
  definition: "what a run of logged sets or mobility readings says about where the work stands",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The best set is the heaviest, and the most reps at that weight breaks a tie.",
    },
    {
      invariantKind: "departure",
      statement: "A set carrying no weight is no candidate for the best.",
    },
    {
      invariantKind: "departure",
      statement: "The last working set is the newest set that is no warmup.",
    },
    {
      invariantKind: "departure",
      statement: "The target to beat is the best weight for one rep more than the best reps.",
    },
    {
      invariantKind: "departure",
      statement: "A trend is read from the oldest reading to the newest.",
    },
    {
      invariantKind: "departure",
      statement: "A trend over fewer than two readings is insufficient rather than flat.",
    },
  ],
} as const satisfies Module
