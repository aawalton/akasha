import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const emailRuleSet = {
  id: "01a06871-54e5-7000-b703-1ea0c1101a4d",
  type: "page-type/module",
  slug: "email-rule-set",
  definition: "the parts of an email an email rule compares",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every field an email rule tests has text.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page to learn the fields.",
    },
  ],
  createdAt: "2026-09-03T18:04:12.901Z",
  updatedAt: "2026-10-30T16:35:55.570Z",
} as const satisfies Module
