import type { TurnStatus } from "akasha/story/world/stories/played/turns/turn-status/turn-status.page-type.types.ts"

export const writer = {
  id: "01a0dead-3b11-7f67-95ce-c960532c7df2",
  type: "page-type/turn-status",
  slug: "writer",
  title: "Writer",
  definition: "the writer's move, writing a turn's prose from its beats",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A fresh agent writes the prose with the style rules in scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer records the prose and advances the turn to player.",
    },
  ],
} as const satisfies TurnStatus
