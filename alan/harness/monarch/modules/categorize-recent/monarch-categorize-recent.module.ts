import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchCategorizeRecent = {
  id: "01a06867-fdff-7025-8e5f-0b54b3e88265",
  type: "module",
  slug: "monarch-categorize-recent",
  definition: "the standing rules run over what arrived lately, without asking",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The window is the unattended window rather than the trusted window.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row somebody has already answered is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A split row is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row claimed by more than one rule is written by no rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule that matches and reaches no category leaves the row and says why.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Why each row was left is tallied for a run to say beside the rows written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run may say the changes that run would make and write nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A contested row leaves the run non-zero.",
    },
  ],
} as const satisfies Module
