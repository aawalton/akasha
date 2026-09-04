import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchHistory = {
  id: "01a06866-06f1-7379-8907-207d1cc99b42",
  pageTypeSlug: "module",
  slug: "monarch-history",
  definition: "our copy of Monarch read as the rows a rule is weighed against",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A row carries the standing category by its title where a page names one and by its slug otherwise.",
    },
    {
      invariantKind: "departure",
      statement: "A transaction resolving other than exactly one line is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A neighbourhood is read from the database over twice the rule's window, which is the same span the in-memory slice takes.",
    },
    {
      invariantKind: "departure",
      statement: "A rule with no counterpart clause reads no neighbourhood at all.",
    },
    {
      invariantKind: "departure",
      statement: "A row a rule settles is not left unsettled, and a row no rule settles is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A missing field reads as empty rather than as absent, so every row has the same shape.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
