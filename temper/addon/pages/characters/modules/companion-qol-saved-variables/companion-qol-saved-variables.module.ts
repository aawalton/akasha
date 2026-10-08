import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionQolSavedVariables = {
  id: "01a0611d-84cc-7974-969f-8cbccd74d0f6",
  type: "page-type/module",
  slug: "companion-qol-saved-variables",
  definition: "opening the quality-of-life settings account-wide or per character",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Switching between account-wide and per character carries the current settings over.",
    },
  ],
  createdAt: "2026-09-02T07:55:19.628Z",
  updatedAt: "2026-09-22T01:32:08.000Z",
} as const satisfies Module
