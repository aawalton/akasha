import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchRuleAmounts = {
  id: "01a06863-264d-7413-a29a-4e2976d1dc3b",
  type: "page-type/module",
  slug: "monarch-rule-amounts",
  definition: "how code matches a Monarch transaction against the amounts of a category rule",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An amount is weighed in cents.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two sums a hundredth apart are two sums.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An exclusion is weighed before an inclusion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An excluded amount never matches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clause naming no amount matches every amount rather than no amount.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clause naming an amount of zero is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An amount that is not a finite number is refused by the rule's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One amount and a list of amounts are read alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An amount stated as text is read as an amount rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An inclusion is said with `or` and an exclusion with `and`.",
    },
  ],
  createdAt: "2026-09-03T17:48:43.469Z",
  updatedAt: "2026-10-30T15:44:21.828Z",
} as const satisfies Module
