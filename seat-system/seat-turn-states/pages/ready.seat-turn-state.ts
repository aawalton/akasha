import type { SeatTurnState } from "../seat-turn-state.page-type.ts"

export const ready = {
  id: "01a076c0-d7f8-7aac-8883-230f77f30349",
  pageTypeSlug: "seat-turn-state",
  type: "seat-turn-state",
  slug: "ready",
  definition: "an agent between turns whose role is on call",
  color: "green",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat reading ready is between turns rather than taking a turn.",
    },
    {
      invariantKind: "departure",
      statement: "A seat reading ready is told apart from an idle seat by its role being on call.",
    },
    {
      invariantKind: "departure",
      statement: "A seat already waiting on something of its own is waiting rather than ready.",
    },
  ],
} as const satisfies SeatTurnState
