import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const saidBy = {
  id: "01a08dd6-adb6-77d6-8c13-b314dea2f9c9",
  type: "page-type/module",
  slug: "said-by",
  definition: "what a thrown thing says",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A thrown thing is read for a message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thrown thing is made to speak even where that thing is no Error.",
    },
  ],
  createdAt: "2026-09-11T00:20:51.766Z",
  updatedAt: "2026-09-15T19:48:30.000Z",
} as const satisfies Module
