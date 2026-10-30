import type { SeatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.types.ts"

export const stopped = {
  id: "01a06925-c777-7d08-a189-07f102279387",
  type: "page-type/seat-turn-state",
  slug: "stopped",
  definition: "an agent that is no longer present",
  color: "color/text",
  createdAt: "2026-09-03T21:21:18.711Z",
  updatedAt: "2026-10-30T15:51:50.597Z",
} as const satisfies SeatTurnState
