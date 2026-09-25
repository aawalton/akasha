import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatTurnState = {
  id: "01a0695a-d2ea-7c13-b182-16f7c69f5587",
  type: "page-type/module",
  slug: "seat-turn-state",
  definition: "how code reads what a seat is doing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The role's on-call flag decides rather than the seat's own on-call flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the records say of a seat's turn is read by the seat turn reading.",
    },
  ],
} as const satisfies Module
