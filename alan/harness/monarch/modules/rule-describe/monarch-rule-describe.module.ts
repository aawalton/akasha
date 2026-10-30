import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchRuleDescribe = {
  id: "01a06865-ecc3-7e80-81ec-7da942f39d07",
  type: "page-type/module",
  slug: "monarch-rule-describe",
  definition: "how code describes a category rule in words",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule is described from its clauses rather than from the words its page was written in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alternatives within a clause are joined with `or` and the clauses with `and`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clause excluding several values is joined with `and`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clause that is not stated is not described.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says the decision a rule makes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Only the clauses a rule narrows on are said here.",
    },
  ],
  createdAt: "2026-09-03T17:51:45.347Z",
  updatedAt: "2026-10-30T15:45:00.304Z",
} as const satisfies Module
