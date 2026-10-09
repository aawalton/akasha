import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchCategorizeRecent = {
  id: "01a06867-fdff-7025-8e5f-0b54b3e88265",
  type: "page-type/module",
  slug: "monarch-categorize-recent",
  definition: "the standing rules run over what arrived lately, without asking",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The window is the unattended window rather than the trusted window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row somebody has already answered is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row an overriding rule replaces Monarch's category on is weighed, whatever its date.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A split row is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row claimed by more than one rule is written by no rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule that matches and reaches no category leaves the row and says why.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Why each row was left is tallied for a run to say beside the rows written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contested row leaves the run non-zero.",
    },
  ],
  createdAt: "2026-09-03T17:54:00.831Z",
  updatedAt: "2026-10-09T19:29:15.990Z",
} as const satisfies Module
