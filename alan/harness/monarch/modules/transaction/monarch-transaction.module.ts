import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchTransaction = {
  id: "01a0685f-4ed9-79ad-a2e6-7f7ef50b5218",
  type: "page-type/module",
  slug: "monarch-transaction",
  definition:
    "what every reader of a Monarch row agrees a transaction is, and the windows judged against it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A transaction is the six fields a rule can weigh rather than the whole of Monarch's row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A description is the merchant and the statement line joined in that order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An amount is compared in cents.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two sums a hundredth apart are two sums.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day gap is whole days from midnight UTC rather than elapsed time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A date that cannot be parsed is refused rather than measured as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account is known by the last four digits its title ends in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account whose title ends in no four digits is known by its lowered title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category of Uncategorized is no answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The trusted window is twelve months and the unattended window is seven days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window is cut from a moment handed in rather than from the clock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run can be repeated.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file or reaches Monarch.",
    },
  ],
} as const satisfies Module
