import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchRuleDescribe = {
  id: "01a06865-ecc3-7e80-81ec-7da942f39d07",
  type: "module",
  slug: "monarch-rule-describe",
  definition: "a rule said back in one line, as the clauses it narrows on",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rule is described from its clauses rather than from the words its page was written in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Alternatives within a clause are joined with `or` and the clauses with `and`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A clause excluding several values is joined with `and`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A clause that is not stated is not described.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says the decision a rule makes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Only the clauses a rule narrows on are said here.",
    },
  ],
} as const satisfies Module
