import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchEvalAdapter = {
  id: "01a0613a-e0a7-755c-8441-e2bc847bee09",
  pageTypeSlug: "module",
  slug: "search-eval-adapter",
  definition:
    "the synthetic rule and empty environment that let a filter reuse a rule-editor condition checker",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A rule-editor checker takes a compiled rule and item facts and an eval context.",
    },
    {
      invariantKind: "departure",
      statement: "Every environment accessor here throws rather than answering.",
    },
    {
      invariantKind: "departure",
      statement:
        "The synthetic rule names the stock action and the category that matches every item.",
    },
  ],
} as const satisfies Module
