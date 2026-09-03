import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchRuleAmounts = {
  id: "01a06863-264d-7413-a29a-4e2976d1dc3b",
  pageTypeSlug: "module",
  slug: "monarch-rule-amounts",
  definition:
    "the amount clause a rule states, weighed against a transaction and said back in words",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An amount is weighed in cents, so two sums a hundredth apart are two sums.",
    },
    {
      invariantKind: "departure",
      statement:
        "An exclusion is weighed before an inclusion, so an excluded amount never matches.",
    },
    {
      invariantKind: "departure",
      statement: "A clause naming no amount matches every amount rather than none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A clause naming an amount of zero is refused, because no transaction this project writes carries one and the clause would read as a merchant that has stopped coming.",
    },
    {
      invariantKind: "departure",
      statement: "An amount that is not a finite number is refused by the rule's name.",
    },
    {
      invariantKind: "departure",
      statement: "One amount and a list of amounts are read alike.",
    },
    {
      invariantKind: "departure",
      statement: "An amount stated as text is read as an amount rather than refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "An inclusion is said with `or` and an exclusion with `and`, because excluding several excludes every one.",
    },
  ],
} as const satisfies Module
