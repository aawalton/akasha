import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const emailRuleFolder = {
  id: "01a18daa-fc33-78f7-bf8e-040c1dfaaa10",
  type: "page-type/module",
  slug: "email-rule-folder",
  definition: "the folder that holds an email rule",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule's kind is the folder the rule is in rather than a key on the rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder a rule is in names the person whose rule that rule is.",
    },
  ],
  createdAt: "2026-10-30T16:35:55.570Z",
  updatedAt: "2026-10-30T16:35:55.570Z",
} as const satisfies Module
