import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorInteractiveSpawn = {
  id: "01a06871-3115-7008-8fbf-3dbf3b640571",
  type: "page-type/module",
  slug: "supervisor-interactive-spawn",
  definition: "how code makes the arguments a Claude Code process starts with",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every seat condition is staged before that condition is awaited.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The conditions are read together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A model override on the options is taken over the seat's stated worker model.",
    },
  ],
  createdAt: "2026-09-03T18:04:03.733Z",
  updatedAt: "2026-10-30T15:48:04.230Z",
} as const satisfies Module
