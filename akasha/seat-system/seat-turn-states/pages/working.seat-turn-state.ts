import type { SeatTurnState } from "../seat-turn-state.page-type.ts"

export const working = {
  pageTypeSlug: "seat-turn-state",
  slug: "working",
  definition: "an agent taking a turn",
  colorSlug: "green",
} as const satisfies SeatTurnState
