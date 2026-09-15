import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const emailRuleDeciding = {
  id: "01a06871-54e5-7002-a44f-3d96cfa5d667",
  type: "page-type/module",
  slug: "email-rule-deciding",
  definition: "which of a person's email rules claims a piece of mail",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first rule whose every clause has is the rule that claims the message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message no rule claims is answered as no rule rather than as a rule.",
    },
  ],
} as const satisfies Module
