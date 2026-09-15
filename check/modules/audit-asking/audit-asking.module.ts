import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const auditAsking = {
  id: "01a09239-89d9-7000-b122-2e19bbb8547e",
  type: "page-type/module",
  slug: "audit-asking",
  definition: "a round of the audit service asked for at a commit, and what its verdicts say",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A round is asked for here rather than run here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The round asked for is the audit service's unit, started and waited on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A verdict at the commit asked or at a descendant of it answers for that commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A verdict that refused answers as much as a verdict that refused nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check every verdict already answers for is owed no round.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check owed a round is asked for by name before that round starts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that is no check slug leaves the round unasked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round is asked for twice at most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second round is asked for only where a check is still unanswered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check unanswered after that is named rather than answered clean.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round that would not start leaves every check it was owed unanswered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round that ran is named on a list the caller hands in, with the checks asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller wanting none of that naming hands in no list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is named with the check that refused it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is named with the commit its verdict is at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check that could not run is named apart from a check that refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a check.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a verdict.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which checks run at audit.",
    },
  ],
} as const satisfies Module
