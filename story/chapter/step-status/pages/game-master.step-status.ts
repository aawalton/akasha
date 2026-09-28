import type { StepStatus } from "akasha/story/chapter/step-status/step-status.page-type.types.ts"

export const gameMaster = {
  id: "01a0dead-3b10-7234-922d-8dfc80845bcc",
  type: "page-type/step-status",
  slug: "game-master",
  title: "Game Master",
  definition: "the game master's move, writing a turn's beats and settling its mechanics",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master advances every turn to writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn back from the reviewers has its beats mended here.",
    },
  ],
} as const satisfies StepStatus
