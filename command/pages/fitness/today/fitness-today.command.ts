import type { Command } from "akasha/command/command.page-type.types.ts"

export const fitnessToday = {
  id: "01a11c11-584b-723d-ab40-7318e1e242c3",
  type: "page-type/command",
  slug: "fitness-today",
  definition: "the pounds Alan's day is to move, what he has moved, its focus and its sets",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The day is the tracked day open at the instant a run runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The target and the pounds moved are worked out as the targeting module works them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The focus is the one the schedule names for the day's weekday.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day no schedule names is answered as having no focus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every set logged on the day is answered, warmup or not, in the order performed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here picks the movement Alan does next.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "today",
  arguments: [{ argument: "argument/json" }],
  createdAt: "2026-10-08T15:11:01.194Z",
  updatedAt: "2026-10-08T15:11:01.194Z",
} as const satisfies Command
