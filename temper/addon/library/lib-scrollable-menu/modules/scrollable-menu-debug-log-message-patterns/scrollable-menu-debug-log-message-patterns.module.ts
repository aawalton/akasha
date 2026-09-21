import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDebugLogMessagePatterns = {
  id: "01a06275-c447-77e7-8ff2-b52861a169f3",
  type: "page-type/module",
  slug: "scrollable-menu-debug-log-message-patterns",
  definition: "the numbered format strings the debug log looks up by message id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Log text is addressed by integer rather than by name.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The table is a flat map from number to format string.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every id from 1 to 197 names a pattern.",
    },
  ],
} as const satisfies Module
