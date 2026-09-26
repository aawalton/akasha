import type { TurnStatus } from "akasha/story/world/stories/played/turns/turn-status/turn-status.page-type.types.ts"

export const reviewers = {
  id: "01a0dead-3b11-722a-b69d-bd1417836650",
  type: "page-type/turn-status",
  slug: "reviewers",
  title: "Reviewers",
  definition: "the reviewers' move, checking a turn's beats for continuity",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One fresh agent runs for each story reviewer page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each reviewer records what it finds as the turn's issues.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last reviewer to finish advances the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn with issues goes back to game-master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn with no issues advances to writer.",
    },
  ],
} as const satisfies TurnStatus
