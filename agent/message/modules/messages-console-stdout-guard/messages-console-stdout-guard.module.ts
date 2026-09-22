import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const messagesConsoleStdoutGuard = {
  id: "01a0686c-f06b-7010-8514-3620ed64900f",
  type: "page-type/module",
  slug: "messages-console-stdout-guard",
  definition: "standard output kept clear of logging where the protocol itself is spoken there",
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
} as const satisfies Module
