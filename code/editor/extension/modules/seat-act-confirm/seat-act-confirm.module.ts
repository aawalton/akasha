import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatActConfirm = {
  id: "01a0686b-bfe9-7d14-9f46-c9701b005af8",
  type: "page-type/module",
  slug: "seat-act-confirm",
  definition: "what Alan is asked before an act loses a seat's part-way turn",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reset is always confirmed whether the seat runs or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stopped seat is asked nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A running seat is asked only where a step stops or restarts its process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The prompt names the seat and names the act in the act's own word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reset says the agent is lost rather than the turn.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks anything of Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A restart is confirmed as a stop is, the turn being lost either way.",
    },
  ],
} as const satisfies Module
