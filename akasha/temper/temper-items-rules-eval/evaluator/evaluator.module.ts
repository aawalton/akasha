import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const evaluator = {
  id: "01a06137-f96c-78f9-8a21-1e325a4be527",
  pageTypeSlug: "module",
  slug: "evaluator",
  definition: "the first-match run of an ordered compiled rule list against one item's facts",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Category then conditions then platform block then destination are checked in that order.",
    },
    {
      invariantKind: "departure",
      statement: "A container is rejected for the fence-launder and fence-sell actions.",
    },
    {
      invariantKind: "departure",
      statement: "A stolen container is rejected for the sell action.",
    },
    {
      invariantKind: "departure",
      statement: "Every rule is evaluated even after the first match is found.",
    },
  ],
} as const satisfies Module
