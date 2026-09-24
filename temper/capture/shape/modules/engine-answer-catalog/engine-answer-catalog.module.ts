import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const engineAnswerCatalog = {
  id: "01a0d42b-9212-7821-8fb2-c85940aa54fd",
  type: "page-type/module",
  slug: "engine-answer-catalog",
  definition: "the shape the game's answers to its functions are written in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A function's answers are kept under the function's name, in the order given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer is a number, a word or a truth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A function asked with values keeps its answers under its name and those values joined by commas.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version the game answers with is kept beside the answers.",
    },
  ],
} as const satisfies Module
