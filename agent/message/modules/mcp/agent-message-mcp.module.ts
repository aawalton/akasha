import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentMessageMcp = {
  id: "01a069cc-ae10-7ea6-a404-37258b7a6cca",
  type: "page-type/module",
  slug: "agent-message-mcp",
  definition: "the program that sends a seat's messages to the seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "SIGTERM and SIGINT each end this server.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cleanup that throws or stalls does not keep this server running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message already claimed is left claimed, for the supervisor to weigh on resume.",
    },
  ],
  createdAt: "2026-09-04T00:23:36.720Z",
  updatedAt: "2026-09-25T18:02:43.000Z",
} as const satisfies Module
