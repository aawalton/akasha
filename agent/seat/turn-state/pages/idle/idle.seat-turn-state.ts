import type { SeatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.types.ts"

export const idle = {
  id: "01a06925-c777-7e84-b147-2a1c7af4f56c",
  type: "page-type/seat-turn-state",
  slug: "idle",
  definition: "an agent between turns",
  parts: [
    "seat-turn-state/idle-pending",
    "seat-turn-state/ready",
    "seat-turn-state/needs-attention",
  ],
  color: "color/yellow",
  createdAt: "2026-09-03T21:21:18.711Z",
  updatedAt: "2026-09-26T18:31:02.000Z",
} as const satisfies SeatTurnState
