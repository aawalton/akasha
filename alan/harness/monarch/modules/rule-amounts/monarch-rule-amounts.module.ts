import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchRuleAmounts = {
  id: "01a06863-264d-7413-a29a-4e2976d1dc3b",
  type: "page-type/module",
  slug: "monarch-rule-amounts",
  definition:
    "the amount clause a rule states, weighed against a transaction and said back in words",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An amount is weighed in cents.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two sums a hundredth apart are two sums.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An exclusion is weighed before an inclusion.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An excluded amount never matches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A clause naming no amount matches every amount rather than no amount.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A clause naming an amount of zero is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An amount that is not a finite number is refused by the rule's name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One amount and a list of amounts are read alike.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An amount stated as text is read as an amount rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An inclusion is said with `or` and an exclusion with `and`.",
    },
  ],
} as const satisfies Module
