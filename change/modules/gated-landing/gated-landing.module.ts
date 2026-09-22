import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gatedLanding = {
  id: "01a068a4-60f0-7001-aebb-1a5a0fbc991d",
  type: "page-type/module",
  slug: "gated-landing",
  definition:
    "bodies written and paths taken away in a mechanical landing, answering the sha it made",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing with no change commits nothing and answers no sha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body to write goes in through the change adding a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path to take away goes through the change removing a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One landing has both the bodies written and the removals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is named against the root the landing is made in rather than absolutely.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sha is the one the landing answers rather than one read out of a report.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing that stopped after it committed is refused naming that commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The bodies go into the landing in process rather than out to the pages service or a command line.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The writer an act names is read by nothing.",
    },
  ],
} as const satisfies Module
