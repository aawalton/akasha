import type { Module } from "@akasha/code-system/module"

export const emailRuleDeciding = {
  id: "01a06871-54e5-7002-a44f-3d96cfa5d667",
  pageTypeSlug: "module",
  slug: "email-rule-deciding",
  definition: "which of a person's email rules claims a piece of mail",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The first rule whose every clause holds is the rule that claims the message.",
    },
    {
      invariantKind: "departure",
      statement: "A message no rule claims is answered as none rather than as a rule.",
    },
  ],
} as const satisfies Module
