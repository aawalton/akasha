import type { SeatTurnState } from "../seat-turn-state.page-type.ts"

export const stopped = {
  id: "01a06925-c777-7d08-a189-07f102279387",
  pageTypeSlug: "seat-turn-state",
  slug: "stopped",
  definition: "an agent no longer present to take a turn",
  colorSlug: "text",
} as const satisfies SeatTurnState
