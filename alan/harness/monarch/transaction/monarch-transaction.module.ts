import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchTransaction = {
  id: "01a0685f-4ed9-79ad-a2e6-7f7ef50b5218",
  pageTypeSlug: "module",
  slug: "monarch-transaction",
  definition:
    "what every reader of a Monarch row agrees a transaction is, and the windows judged against it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A transaction is the six fields a rule can weigh rather than the whole of Monarch's row.",
    },
    {
      invariantKind: "departure",
      statement: "A description is the merchant and the statement line joined, in that order.",
    },
    {
      invariantKind: "departure",
      statement: "An amount is compared in cents, so two sums a hundredth apart are two sums.",
    },
    {
      invariantKind: "departure",
      statement: "A day gap is whole days from midnight UTC rather than elapsed time.",
    },
    {
      invariantKind: "departure",
      statement: "A date that cannot be parsed is refused rather than measured as nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account is known by the last four digits its title ends in, and by its lowered title where it has none.",
    },
    {
      invariantKind: "departure",
      statement: "A category of Uncategorized is no answer.",
    },
    {
      invariantKind: "departure",
      statement: "The trusted window is twelve months and the unattended window is seven days.",
    },
    {
      invariantKind: "departure",
      statement:
        "A window is cut from a moment handed in rather than from the clock, so a run can be repeated.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file or reaches Monarch.",
    },
  ],
} as const satisfies Module
