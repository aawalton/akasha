import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const emailRuleDeciding = {
  id: "01a06871-54e5-7002-a44f-3d96cfa5d667",
  type: "page-type/module",
  slug: "email-rule-deciding",
  definition: "the first email rule that matches a message",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The first rule whose every clause has is the rule that claims the message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message no rule claims is answered as no rule rather than as a rule.",
    },
  ],
  createdAt: "2026-09-03T18:04:12.901Z",
  updatedAt: "2026-10-30T15:29:43.260Z",
} as const satisfies Module
