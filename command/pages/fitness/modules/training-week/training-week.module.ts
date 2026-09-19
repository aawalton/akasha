import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const trainingWeek = {
  id: "01a0b6ed-9dd8-7ed5-a746-300f4c03dd98",
  type: "page-type/module",
  slug: "training-week",
  definition: "the sets a trailing week of training held, counted by muscle and by pattern",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window is seven days wide and is named by the day the window ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set counts only where that set names a movement this knows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set outside the window is neither counted nor passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The effort a set counts at is handed in rather than read here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says what a count is owed against.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day a set falls on is read from the day that set names.",
    },
  ],
} as const satisfies Module
