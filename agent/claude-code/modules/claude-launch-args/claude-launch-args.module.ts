import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const claudeLaunchArgs = {
  id: "01a0695a-d2ea-7745-a7c8-079b5840aab1",
  type: "page-type/module",
  slug: "claude-launch-args",
  definition: "the command line a claude child starts under, and the mcp config it is handed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A child is named on its command line for the seat it answers in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name a child is started under is the live name and the durable title both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A child whose remote control is on names its remote control session for the seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A remote control session left unnamed is named for the machine and two words.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A child is started with no model to fall back to.",
    },
  ],
} as const satisfies Module
