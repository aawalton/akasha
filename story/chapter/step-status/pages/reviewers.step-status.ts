import type { StepStatus } from "akasha/story/chapter/step-status/step-status.page-type.types.ts"

export const reviewers = {
  id: "01a0dead-3b11-722a-b69d-bd1417836650",
  type: "page-type/step-status",
  slug: "reviewers",
  title: "Reviewers",
  definition: "the reviewers' move, checking a turn's beats, prose and what was recorded of it",
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
      statement: "A turn with issues goes back to game-master for repair.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only the reviewers with an issue the game master did not rule out review the mended turn again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The round trip ends once no reviewer has an issue left that is not ruled out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reviewer raising a ruled-out issue again word for word has that line dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn with no issues advances to player, its recorders having run.",
    },
  ],
} as const satisfies StepStatus
