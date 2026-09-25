import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const functionAnswers = {
  id: "01a0d578-6f2a-7cfe-8a48-d3666d473452",
  type: "page-type/module",
  slug: "function-answers",
  definition: "the asking of one of the game's functions by name, for the answers it gives",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A function that raises or is not there answers nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function's answers are kept up to the first that is no number, word or truth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller asking for a function's answers whole gets nothing where one is no number, word or truth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number that is not finite is no number here.",
    },
  ],
} as const satisfies Module
