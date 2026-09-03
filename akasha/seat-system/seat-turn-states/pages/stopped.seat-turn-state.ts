import type { SeatTurnState } from "../seat-turn-state.page-type.ts"

export const stopped = {
  pageTypeSlug: "seat-turn-state",
  slug: "stopped",
  definition: "an agent no longer present to take a turn",
  colorSlug: "text",
} as const satisfies SeatTurnState
