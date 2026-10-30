import type { SeatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.types.ts"

export const working = {
  id: "01a06925-c777-7e12-a836-32449268dc04",
  type: "page-type/seat-turn-state",
  slug: "working",
  definition: "an agent that works on a message",
  color: "color/green",
  createdAt: "2026-09-03T21:21:18.711Z",
  updatedAt: "2026-10-30T15:37:45.383Z",
} as const satisfies SeatTurnState
