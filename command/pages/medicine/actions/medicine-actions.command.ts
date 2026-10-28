import type { Command } from "akasha/command/command.page-type.types.ts"

export const medicineActions = {
  id: "01a183df-77e9-72fb-8f9d-f833d5170779",
  type: "page-type/command",
  slug: "medicine-actions",
  definition: "the actions Alan could take, ranked by the years of life each one adds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An action sets one factor to the best level the evidence reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action is ranked by the median of the years it adds, counted to 100.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action's years are said with the 10th and the 90th percentile over the draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action names each cause whose chance it moves, in percentage points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action that costs years is answered as a loss rather than left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names each action that no page lets it weigh.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "actions",
  arguments: [{ argument: "argument/json" }],
  createdAt: "2026-10-28T18:57:02.952Z",
  updatedAt: "2026-10-28T18:57:02.952Z",
} as const satisfies Command
