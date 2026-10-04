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
        "The game master advances a turn to mechanics, or to writer with no mechanics seat to run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn back from mechanics or the reviewers comes back for repair, and its beats are mended here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mend keeps every step's part of the beats before its first moved one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mend moving a beat runs every recorder again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mend moving no beat runs the mechanics seats again only where issues remain.",
    },
  ],
} as const satisfies StepStatus
