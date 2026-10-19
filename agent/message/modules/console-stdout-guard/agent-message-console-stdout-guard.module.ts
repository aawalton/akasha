import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentMessageConsoleStdoutGuard = {
  id: "01a0686c-f06b-7010-8514-3620ed64900f",
  type: "page-type/module",
  slug: "agent-message-console-stdout-guard",
  definition: "how code writes each log to standard error",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A log written to standard output goes to standard error instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This module is loaded for the effect of loading rather than anything this module exports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This module is loaded before anything that might log.",
    },
  ],
  createdAt: "2026-09-03T17:59:25.035Z",
  updatedAt: "2026-10-19T18:03:12.432Z",
} as const satisfies Module
