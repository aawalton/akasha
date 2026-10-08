import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatTurnPending = {
  id: "01a0695a-d2ea-7792-be19-da7a851ad311",
  type: "page-type/module",
  slug: "seat-turn-pending",
  definition: "how code keeps whether a seat waits",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A write that threw says why, rather than reading as a write that changed nothing.",
    },
  ],
  createdAt: "2026-09-03T22:19:15.050Z",
  updatedAt: "2026-09-25T17:59:35.000Z",
} as const satisfies Module
