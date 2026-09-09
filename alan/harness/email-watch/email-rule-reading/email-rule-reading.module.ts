import type { Module } from "@akasha/code/module"

export const emailRuleReading = {
  id: "01a06871-54e5-7001-a2eb-d37372c1e8a3",
  pageTypeSlug: "module",
  type: "module",
  slug: "email-rule-reading",
  definition: "a person's email rules read from the pages that have them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule is read from its page rather than from markdown.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule source that cannot be read raises rather than counting as a person with no rule.",
    },
    {
      invariantKind: "departure",
      statement: "A kind whose folder has no rule raises.",
    },
    {
      invariantKind: "departure",
      statement: "A clause comparing by a spelling no comparison names raises.",
    },
    {
      invariantKind: "departure",
      statement: "A rule with no clause raises rather than claiming every message.",
    },
    {
      invariantKind: "departure",
      statement: "Agent rules are read before code rules.",
    },
    {
      invariantKind: "departure",
      statement: "Each kind is read in the order of its page file names.",
    },
  ],
} as const satisfies Module
