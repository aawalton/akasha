import type { SeatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.types.ts"

export const idlePending = {
  id: "01a06925-c777-7370-8dce-f74809dc4569",
  type: "page-type/seat-turn-state",
  slug: "idle-pending",
  definition: "an idle agent whose arranged work is still to come",
  color: "color/blue",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A reminder does not make a turn pending.",
    },
  ],
  createdAt: "2026-09-03T21:21:18.711Z",
  updatedAt: "2026-10-30T15:52:21.951Z",
} as const satisfies SeatTurnState
