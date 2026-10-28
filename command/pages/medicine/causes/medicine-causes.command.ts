import type { Command } from "akasha/command/command.page-type.types.ts"

export const medicineCauses = {
  id: "01a183df-77e9-749a-8fd1-ab4caa3cd297",
  type: "page-type/command",
  slug: "medicine-causes",
  definition:
    "Alan's likeliest causes of death, ranked, each with its chance and the age it comes at",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cause is ranked by the median of Alan's lifetime chance of dying of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chance is said with the 10th and the 90th percentile over the draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The age at a death is the spread of the ages that cause takes Alan at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer ends with Alan's life expectancy, counted to 100, and its range.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer opens with what was read of Alan and over which days.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A cause whose chance stays under one in two thousand is left out.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "causes",
  arguments: [{ argument: "argument/json" }],
  createdAt: "2026-10-28T18:57:02.952Z",
  updatedAt: "2026-10-28T18:57:02.952Z",
} as const satisfies Command
