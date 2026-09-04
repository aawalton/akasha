import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const setTarget = {
  id: "01a0685d-cca7-7bf8-a6b0-4bcb8fc0f619",
  pageTypeSlug: "module",
  slug: "set-target",
  definition: "the set to beat the best set by, and how that target reads",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A target is beaten by one more repetition at the load the best set carried.",
    },
    {
      invariantKind: "departure",
      statement: "A best set carrying no load names no target rather than naming an unloaded one.",
    },
    {
      invariantKind: "departure",
      statement: "A best set counted at no repetitions is beaten at one.",
    },
    {
      invariantKind: "departure",
      statement: "What the target is and how the target reads are settled apart.",
    },
  ],
} as const satisfies Module
