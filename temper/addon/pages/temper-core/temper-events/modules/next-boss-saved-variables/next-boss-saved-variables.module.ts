import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nextBossSavedVariables = {
  id: "01a06157-8358-7649-943c-84dc225013dc",
  type: "page-type/module",
  slug: "next-boss-saved-variables",
  definition: "what this tracker keeps between sessions, and its starting values",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The saved variables are kept for the whole account rather than for one character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The timers kept are read back only where the campaign is the one those timers were kept under.",
    },
  ],
  createdAt: "2026-09-02T08:58:40.344Z",
  updatedAt: "2026-09-22T13:45:15.000Z",
} as const satisfies Module
