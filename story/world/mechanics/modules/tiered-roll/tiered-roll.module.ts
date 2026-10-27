import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tieredRoll = {
  id: "01a17ef1-0df2-78c1-8a70-031b2a10b333",
  type: "page-type/module",
  slug: "tiered-roll",
  definition: "which outcome tier an act's score lands",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An act's score is 3d60 less 92, plus its skill or stat, its modifiers and both difficulties.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The story's own code turns the skill or stat an act names into its points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act has at most three modifiers, each from -10 to 15.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recent similar success adds 5 to 15.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The engine adds the story's difficulty level to the roll before this rule reads it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The score lands the outcome tier its floor says, read off the tier pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action difficulty stating no odds modifier lands Failure with no score.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every check settling an act this way imports this rule rather than stating it again.",
    },
  ],
  createdAt: "2026-10-27T19:58:09.393Z",
  updatedAt: "2026-10-27T19:58:09.393Z",
} as const satisfies Module
