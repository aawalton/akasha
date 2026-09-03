import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const setHistory = {
  id: "01a0683a-6e1b-7224-966b-2982351c6d03",
  pageTypeSlug: "module",
  slug: "set-history",
  definition: "the best set and the last working set among a movement's logged lines",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line is read newest first.",
    },
    {
      invariantKind: "departure",
      statement: "The best set is the heaviest.",
    },
    {
      invariantKind: "departure",
      statement: "Reps break a tie on weight.",
    },
    {
      invariantKind: "departure",
      statement: "A line stating no weight is no candidate for the best set.",
    },
    {
      invariantKind: "departure",
      statement: "A warmup is no candidate for the last working set.",
    },
    {
      invariantKind: "departure",
      statement: "A warmup is a candidate for the best set.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a page.",
    },
  ],
} as const satisfies Module
