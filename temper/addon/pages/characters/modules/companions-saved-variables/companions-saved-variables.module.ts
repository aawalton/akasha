import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsSavedVariables = {
  id: "01a0611d-84df-7d7e-8754-8460553e63d0",
  type: "page-type/module",
  slug: "companions-saved-variables",
  definition: "what the companion add-on keeps between sessions, and how a session opens it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion entry is made on first touch rather than declared up front.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rapport the pages hold fills each companion a character's saved table lacks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rapport the saved table already holds is kept over the pages' rapport.",
    },
  ],
  createdAt: "2026-09-02T07:55:19.647Z",
  updatedAt: "2026-10-11T12:00:31.429Z",
} as const satisfies Module
