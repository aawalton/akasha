import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentRow = {
  id: "01a0686b-bfe9-7005-a82e-21c216ec82ea",
  type: "page-type/module",
  slug: "agent-row",
  definition: "the shape a click on a seat carries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A click has the seat's id and the seat's name and nothing more.",
    },
  ],
} as const satisfies Module
