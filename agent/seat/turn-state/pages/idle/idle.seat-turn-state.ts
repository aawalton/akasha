import type { SeatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.types.ts"

export const idle = {
  id: "01a06925-c777-7e84-b147-2a1c7af4f56c",
  type: "page-type/seat-turn-state",
  slug: "idle",
  definition: "an agent that waits for a message",
  parts: [
    "seat-turn-state/idle-pending",
    "seat-turn-state/ready",
    "seat-turn-state/needs-attention",
  ],
  color: "color/yellow",
  createdAt: "2026-09-03T21:21:18.711Z",
  updatedAt: "2026-10-30T15:29:18.358Z",
} as const satisfies SeatTurnState
