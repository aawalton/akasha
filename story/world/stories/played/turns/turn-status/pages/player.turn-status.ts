import type { TurnStatus } from "akasha/story/world/stories/played/turns/turn-status/turn-status.page-type.types.ts"

export const player = {
  id: "01a0dead-3b11-793d-b1ad-794e91dbdfaf",
  type: "page-type/turn-status",
  slug: "player",
  title: "Player",
  definition: "the player's move, reading a turn and choosing the next action",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn at this status is ready to read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The player's next action makes the next turn.",
    },
  ],
} as const satisfies TurnStatus
