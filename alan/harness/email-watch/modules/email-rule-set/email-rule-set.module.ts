import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const emailRuleSet = {
  id: "01a06871-54e5-7000-b703-1ea0c1101a4d",
  type: "page-type/module",
  slug: "email-rule-set",
  definition: "the fields an email rule tests, and where a person's rules of each kind are",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every field an email rule tests has text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule's kind is the folder the rule is in rather than a key on the rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder a rule is in names the person whose rule that rule is.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a page to learn the fields.",
    },
  ],
} as const satisfies Module
