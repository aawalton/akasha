import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const emailRuleReading = {
  id: "01a06871-54e5-7001-a2eb-d37372c1e8a3",
  type: "module",
  slug: "email-rule-reading",
  definition: "a person's email rules read from the pages that have them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule is read from its page rather than from markdown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rule source that cannot be read raises rather than counting as a person with no rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kind whose folder has no rule raises.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rule of one kind is the index's answer for that kind's page type rather than a folder listed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The person whose rule it is comes from the path the index answers with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The person a rule forwards to reads back as the slug alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A clause comparing by a spelling no comparison names raises.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule with no clause raises rather than claiming every message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Agent rules are read before code rules.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each kind is read in the order of its page file names.",
    },
  ],
} as const satisfies Module
