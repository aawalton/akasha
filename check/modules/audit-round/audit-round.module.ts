import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const auditRound = {
  id: "01a0aca1-9651-7fd0-9386-902aead96271",
  type: "page-type/module",
  slug: "audit-round",
  definition: "a round judged in the cluster, and what turned red told to whoever champions checks",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A round reads the verdicts it had before the checks are judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check whose input never moved is carried onto this commit before any job.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check carried that way is asked of the cluster by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check with no verdict yet is carried nowhere and is asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check whose verdict is at this commit already is carried nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree is walked once for the carrying rather than once for each check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round reads them again once the cluster has answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is newly refusing is the difference between those two readings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check with no verdict after the round is left out rather than written over.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges a check, so no verdict is written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round whose checks all answered as before tells nobody.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One message carries every check that turned in a round.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round the cluster would not take is carried back as a refusal of the round.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may put a sending of its own in place of the one that writes a message.",
    },
  ],
} as const satisfies Module
