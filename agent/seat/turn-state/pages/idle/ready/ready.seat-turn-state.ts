import type { SeatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.types.ts"

export const ready = {
  id: "01a076c0-d7f8-7aac-8883-230f77f30349",
  type: "page-type/seat-turn-state",
  slug: "ready",
  definition: "an idle agent whose role is on call",
  color: "color/purple",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat reading ready is between turns rather than taking a turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat reading ready is told apart from an idle seat by its role being on call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat already waiting on something of its own is waiting rather than ready.",
    },
  ],
  createdAt: "2026-09-06T12:45:44.824Z",
  updatedAt: "2026-10-30T15:50:50.014Z",
} as const satisfies SeatTurnState
