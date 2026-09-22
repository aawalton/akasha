import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchHistory = {
  id: "01a06866-06f1-7379-8907-207d1cc99b42",
  type: "page-type/module",
  slug: "monarch-history",
  definition: "our copy of Monarch taken as the rows weighing a rule",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row has the standing category by its title where a page names that category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row has the standing category by its slug where no page names that category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transaction resolving other than exactly one line is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A neighbourhood is read from the database over twice the rule's window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The in-memory slice takes the same span as that database read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule with no counterpart clause reads no neighbourhood at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A missing field reads as empty rather than as absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every row has the same shape.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
