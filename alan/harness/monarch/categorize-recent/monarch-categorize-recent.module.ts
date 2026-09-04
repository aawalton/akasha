import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchCategorizeRecent = {
  id: "01a06867-fdff-7025-8e5f-0b54b3e88265",
  pageTypeSlug: "module",
  slug: "monarch-categorize-recent",
  definition: "the standing rules run over what arrived lately, without asking",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The window is the unattended one rather than the trusted one, because this runs without asking.",
    },
    {
      invariantKind: "departure",
      statement: "A row somebody has already answered is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A split row is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row claimed by more than one rule is written by none of them, because the rule set is meant to be a partition and this is the audit and the world disagreeing.",
    },
    {
      invariantKind: "departure",
      statement: "A rule that matches and reaches no category leaves the row and says why.",
    },
    {
      invariantKind: "departure",
      statement:
        "Why each row was left is tallied, so a run says what it did not do as well as what it did.",
    },
    {
      invariantKind: "departure",
      statement: "A run may say what it would do and write nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A contested row leaves the run non-zero.",
    },
  ],
} as const satisfies Module
