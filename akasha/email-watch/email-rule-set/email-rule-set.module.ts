import type { Module } from "@akasha/code-system/module"

export const emailRuleSet = {
  id: "01a06871-54e5-7000-b703-1ea0c1101a4d",
  pageTypeSlug: "module",
  slug: "email-rule-set",
  definition: "the fields an email rule tests, and where a person's rules of each kind stand",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every field an email rule tests holds text.",
    },
    {
      invariantKind: "departure",
      statement: "A rule's kind is the folder the rule stands in rather than a key on the rule.",
    },
    {
      invariantKind: "departure",
      statement: "The folder a rule stands in names the person whose rule it is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page to learn what the fields are.",
    },
  ],
} as const satisfies Module
