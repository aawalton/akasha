import type { SeatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.types.ts"

export const idlePending = {
  id: "01a06925-c777-7370-8dce-f74809dc4569",
  type: "seat-turn-state",
  slug: "idle-pending",
  definition: "a turn start the agent arranged is still to come",
  color: "color/blue",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "A reminder does not make a turn pending.",
    },
  ],
} as const satisfies SeatTurnState
