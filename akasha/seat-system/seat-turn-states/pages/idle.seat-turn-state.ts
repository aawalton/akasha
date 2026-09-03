import type { SeatTurnState } from "../seat-turn-state.page-type.ts"

export const idle = {
  pageTypeSlug: "seat-turn-state",
  slug: "idle",
  definition: "an agent between turns",
  colorSlug: "yellow",
} as const satisfies SeatTurnState
