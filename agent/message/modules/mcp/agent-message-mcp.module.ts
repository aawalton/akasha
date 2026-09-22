import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentMessageMcp = {
  id: "01a069cc-ae10-7ea6-a404-37258b7a6cca",
  type: "page-type/module",
  slug: "agent-message-mcp",
  definition: "the MCP server a seat launch runs, joining the seat to its messages' channel",
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
} as const satisfies Module
