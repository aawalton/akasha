import type { SeatTurnState } from "../seat-turn-state.page-type.ts"

export const idlePending = {
  id: "01a06925-c777-7370-8dce-f74809dc4569",
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
