import type { StepStatus } from "akasha/story/chapter/step-status/step-status.page-type.types.ts"

export const writer = {
  id: "01a0dead-3b11-7f67-95ce-c960532c7df2",
  type: "page-type/step-status",
  slug: "writer",
  title: "Writer",
  definition: "the writer's move, writing a turn's prose from its beats",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's writer seat writes the prose with the style rules in scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer records the prose and advances the turn to recorders.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn holding reviewer issues comes here after its mend, whether its beats moved or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The writer repairs that prose where each issue lands, rather than writing it again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An issue the game master ruled out asks nothing of the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn with no story recorder goes on to reviewers, or to player once reviewed.",
    },
  ],
} as const satisfies StepStatus
