import type { SeatTurnState } from "../seat-turn-state.page-type.ts"

export const idle = {
  id: "01a06925-c777-7e84-b147-2a1c7af4f56c",
  pageTypeSlug: "seat-turn-state",
  slug: "idle",
  definition: "an agent between turns",
  partSlugs: ["seat-turn-state/idle-pending"],
  colorSlug: "yellow",
} as const satisfies SeatTurnState
