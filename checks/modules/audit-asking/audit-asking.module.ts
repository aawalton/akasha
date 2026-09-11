import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const auditAsking = {
  id: "01a09239-89d9-7000-b122-2e19bbb8547e",
  type: "module",
  slug: "audit-asking",
  definition: "a round of the audit service asked for at a commit, and what its verdicts say",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A round is asked for here rather than run here.",
    },
    {
      invariantKind: "departure",
      statement: "The round asked for is the audit service's unit, started and waited on.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict at the commit asked or at a descendant of it answers for that commit.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict that refused answers as much as a verdict that refused nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A check every verdict already answers for is owed no round.",
    },
    {
      invariantKind: "departure",
      statement: "A round is asked for twice at most.",
    },
    {
      invariantKind: "departure",
      statement: "A second round is asked for only where a check is still unanswered.",
    },
    {
      invariantKind: "departure",
      statement: "A check unanswered after that is named rather than answered clean.",
    },
    {
      invariantKind: "departure",
      statement: "A round that would not start leaves every check it was owed unanswered.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is named with the check that refused it.",
    },
    {
      invariantKind: "departure",
      statement: "A check that could not run is named apart from a check that refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs a check.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a verdict.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which checks run at audit.",
    },
  ],
} as const satisfies Module
