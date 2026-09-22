import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alanAnswerAsk = {
  id: "01a0c6b7-6ab7-7d01-bf95-32d6769afbe8",
  type: "page-type/module",
  slug: "alan-answer-ask",
  definition: "a question asked in Alan's browser carried to the page store and answered back",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader who is not signed in is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question is carried as a JSON body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The store's answer is carried back unchanged, so the caller reads the store's own shape.",
    },
  ],
} as const satisfies Module
