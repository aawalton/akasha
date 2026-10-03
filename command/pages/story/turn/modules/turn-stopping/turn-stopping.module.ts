import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnStopping = {
  id: "01a10379-5458-7738-9f07-cb33b988ed32",
  type: "page-type/module",
  slug: "turn-stopping",
  definition: "how an advance stops the seat that made it, apart from that seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is stopped by a process of its own session that no stopped seat carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stop names no agent, since the agent it would name is the one ending.",
    },
  ],
} as const satisfies Module
