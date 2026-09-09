import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchHistory = {
  id: "01a06866-06f1-7379-8907-207d1cc99b42",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-history",
  definition: "our copy of Monarch read as the rows a rule is weighed against",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row has the standing category by its title where a page names that category.",
    },
    {
      invariantKind: "departure",
      statement: "A row has the standing category by its slug where no page names that category.",
    },
    {
      invariantKind: "departure",
      statement: "A transaction resolving other than exactly one line is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A neighbourhood is read from the database over twice the rule's window.",
    },
    {
      invariantKind: "departure",
      statement: "The in-memory slice takes the same span as that database read.",
    },
    {
      invariantKind: "departure",
      statement: "A rule with no counterpart clause reads no neighbourhood at all.",
    },
    {
      invariantKind: "departure",
      statement: "A row a rule settles is not left unsettled.",
    },
    {
      invariantKind: "departure",
      statement: "A row no rule settles is left unsettled.",
    },
    {
      invariantKind: "departure",
      statement: "A missing field reads as empty rather than as absent.",
    },
    {
      invariantKind: "departure",
      statement: "Every row has the same shape.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
