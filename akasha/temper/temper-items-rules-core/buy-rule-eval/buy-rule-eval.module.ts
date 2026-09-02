import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buyRuleEval = {
  id: "01a060d9-44c8-7b58-864b-b81a0c27cbac",
  pageTypeSlug: "module",
  slug: "buy-rule-eval",
  definition: "how far short of its target quantity each buy rule falls",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A buy rule turned off answers no evaluation.",
    },
    {
      invariantKind: "departure",
      statement: "A shortfall never falls below zero.",
    },
    {
      invariantKind: "departure",
      statement: "An item absent from the totals counts as zero held.",
    },
  ],
} as const satisfies Module
