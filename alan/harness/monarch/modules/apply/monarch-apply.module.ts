import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchApply = {
  id: "01a06867-e5ed-7dbd-9dc1-7068e19aad4f",
  type: "page-type/module",
  slug: "monarch-apply",
  definition: "how code writes the Monarch category of a category rule on a Monarch transaction",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule that did not match the transaction is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reservation names no category to set and is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unpaired decision is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ambiguity is refused rather than guessed between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Both legs of a paired decision are categorized rather than only the subject.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rule that decided is recorded as the rule's own name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule's note is written only onto the subject and only where no note stands.",
    },
  ],
  createdAt: "2026-09-03T17:53:54.669Z",
  updatedAt: "2026-10-30T15:40:05.133Z",
} as const satisfies Module
