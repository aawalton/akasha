import type { SeatTurnState } from "../seat-turn-state.page-type.ts"

export const working = {
  id: "01a06925-c777-7e12-a836-32449268dc04",
  pageTypeSlug: "seat-turn-state",
  slug: "working",
  definition: "an agent taking a turn",
  colorSlug: "green",
} as const satisfies SeatTurnState
