import type { StepStatus } from "akasha/story/chapter/step-status/step-status.page-type.types.ts"

export const beats = {
  id: "01a17ee3-24b9-7b40-b272-4559c9115562",
  type: "page-type/step-status",
  slug: "beats",
  title: "Beats",
  definition: "the move of every step after the game master, each beat taken on as it is ready",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn at this status has every beat stated, and each step takes one beat at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which beat each step is on is read from the turn's beats file alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An advance at this status names its beat and hands in that beat's part alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The advance filling the last part of the last beat moves the turn to player.",
    },
  ],
  createdAt: "2026-10-27T19:42:57.720Z",
  updatedAt: "2026-10-27T19:42:57.720Z",
} as const satisfies StepStatus
