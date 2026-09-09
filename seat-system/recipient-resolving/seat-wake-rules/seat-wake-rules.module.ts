import type { Module } from "@akasha/code/module"

export const seatWakeRules = {
  id: "01a0686d-9d5e-7017-a8e4-4b5dc1d6aa6b",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-wake-rules",
  definition:
    "what an on-demand seat declares it wakes for, and whether inbound work matches a rule",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule matches only where the sender matches.",
    },
    {
      invariantKind: "departure",
      statement: "A content pattern makes no rule match where the sender does not.",
    },
    {
      invariantKind: "departure",
      statement: "A rule stating no content pattern matches on the sender alone.",
    },
    {
      invariantKind: "departure",
      statement: "A content pattern is read without regard to case.",
    },
    {
      invariantKind: "departure",
      statement:
        "A content pattern that is no regular expression matches nothing rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "Work arriving from nobody matches no rule.",
    },
  ],
} as const satisfies Module
