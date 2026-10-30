import type { SeatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.types.ts"

export const needsAttention = {
  id: "01a0defb-9e02-7cf0-851d-cd27de471d9c",
  type: "page-type/seat-turn-state",
  slug: "needs-attention",
  definition: "an idle agent whose last message needs Alan",
  color: "color/red",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat needing attention is read so over waiting, ready and idle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A working seat is read as working though its last turn asked Alan for something.",
    },
  ],
  createdAt: "2026-09-26T18:30:27.074Z",
  updatedAt: "2026-10-30T15:51:13.587Z",
} as const satisfies SeatTurnState
