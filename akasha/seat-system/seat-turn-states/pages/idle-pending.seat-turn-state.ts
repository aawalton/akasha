import type { SeatTurnState } from "../seat-turn-state.page-type.ts"

export const idlePending = {
  pageTypeSlug: "seat-turn-state",
  slug: "idle-pending",
  definition: "a turn start the agent arranged is still to come",
  colorSlug: "blue",
  invariants: [
    {
      invariantKind: "absence",
      statement: "A reminder does not make a turn pending.",
    },
  ],
} as const satisfies SeatTurnState
