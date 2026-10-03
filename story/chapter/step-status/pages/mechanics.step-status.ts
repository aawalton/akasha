import type { StepStatus } from "akasha/story/chapter/step-status/step-status.page-type.types.ts"

export const mechanics = {
  id: "01a1024d-9f93-7d0a-bcf2-c0e594dac5a1",
  type: "page-type/step-status",
  slug: "mechanics",
  title: "Mechanics",
  definition:
    "the mechanics recorder's move, working out what each beat changes in numbers and items",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One fresh agent runs for each story recorder whose step is mechanics.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each hands in its changes and its issues, and drafts no edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn with issues goes back to game-master once every seat has handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mechanics sends a turn back at most once; a turn already sent back goes on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn with none, or sent back before, goes to writer, or past it where it has prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Issues found after that send-back stay on the turn for its writer and reviewers.",
    },
  ],
} as const satisfies StepStatus
