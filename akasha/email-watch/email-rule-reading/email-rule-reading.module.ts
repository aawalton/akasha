import type { Module } from "@akasha/code-system/module"

export const emailRuleReading = {
  id: "01a06871-54e5-7001-a2eb-d37372c1e8a3",
  pageTypeSlug: "module",
  slug: "email-rule-reading",
  definition: "a person's email rules read from the pages that hold them",
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
        "A rule source that cannot be read raises rather than standing as a person holding no rule.",
    },
    {
      invariantKind: "departure",
      statement: "A kind whose folder holds no rule raises.",
    },
    {
      invariantKind: "departure",
      statement: "A clause comparing by a spelling no comparison names raises.",
    },
    {
      invariantKind: "departure",
      statement: "A rule holding no clause raises rather than claiming every message.",
    },
    {
      invariantKind: "departure",
      statement:
        "Agent rules are read before code rules, and each kind in the order of its page file names.",
    },
  ],
} as const satisfies Module
