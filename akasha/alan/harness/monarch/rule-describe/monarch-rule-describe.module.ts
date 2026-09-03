import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchRuleDescribe = {
  id: "01a06865-ecc3-7e80-81ec-7da942f39d07",
  pageTypeSlug: "module",
  slug: "monarch-rule-describe",
  definition: "a rule said back in one line, as the clauses it narrows on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A rule is described from its clauses rather than from the words its page was written in.",
    },
    {
      invariantKind: "departure",
      statement: "Alternatives within a clause are joined with `or` and the clauses with `and`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A clause excluding several values is joined with `and`, because excluding several excludes every one.",
    },
    {
      invariantKind: "departure",
      statement: "A clause that is not stated is not described.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what a rule decides, only what it narrows on.",
    },
  ],
} as const satisfies Module
