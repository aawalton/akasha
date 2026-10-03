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
      statement:
        "The game master advances a turn to mechanics, or to writer with no mechanics seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter of a story with editor steps goes to beat-editor unless its beats are mended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn back from mechanics or the reviewers has its beats mended here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master's advance starts the mechanics again from nothing.",
    },
  ],
} as const satisfies StepStatus
