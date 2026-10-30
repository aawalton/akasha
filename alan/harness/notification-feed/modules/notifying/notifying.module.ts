import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const notifying = {
  id: "01a06a00-6837-71bf-b475-d3320bf5baab",
  type: "page-type/module",
  slug: "notifying",
  definition: "how code sends a notification to a person for the code that asks",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A notification the caller gives no source for is credited to this module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan's person slug is read from here rather than retyped at each caller.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A notification is written through the feed rows module rather than to a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list the caller hands in is handed on, so a notification filed can be named.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here chooses which person a notification reaches.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No reader here crosses a network.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No type the feed rows module declares is handed on from here.",
    },
  ],
  createdAt: "2026-09-04T01:20:06.711Z",
  updatedAt: "2026-10-30T15:52:59.297Z",
} as const satisfies Module
