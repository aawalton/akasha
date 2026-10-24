import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alanAnswerAsk = {
  id: "01a0c6b7-6ab7-7d01-bf95-32d6769afbe8",
  type: "page-type/module",
  slug: "alan-answer-ask",
  definition: "a question asked in Alan's browser carried to the page store and answered back",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
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
      statement: "A question is answered only where its reader may read the page type asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question is answered only where its reader may read every type extending it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question a narrowed reader asks is held to that reader's narrow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question asking by the narrowed key for pages outside the narrow is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Page types narrowed differently in one question are refused rather than widened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The store's answer is carried back in the store's own shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only Alan is answered the whole of a seat's conversation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other person is answered only what was said in a seat's conversation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type's shape asked in a browser is carried for any reader signed in.",
    },
  ],
  createdAt: "2026-09-22T01:25:04.311Z",
  updatedAt: "2026-10-24T20:20:06.131Z",
} as const satisfies Module
