import type { Module } from "@akasha/code/module"

export const emailRuleSet = {
  id: "01a06871-54e5-7000-b703-1ea0c1101a4d",
  pageTypeSlug: "module",
  type: "module",
  slug: "email-rule-set",
  definition: "the fields an email rule tests, and where a person's rules of each kind are",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every field an email rule tests has text.",
    },
    {
      invariantKind: "departure",
      statement: "A rule's kind is the folder the rule is in rather than a key on the rule.",
    },
    {
      invariantKind: "departure",
      statement: "The folder a rule is in names the person whose rule that rule is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page to learn the fields.",
    },
  ],
} as const satisfies Module
