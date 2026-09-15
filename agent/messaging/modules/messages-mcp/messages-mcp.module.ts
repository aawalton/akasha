import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const messagesMcp = {
  id: "01a069cc-ae10-7ea6-a404-37258b7a6cca",
  type: "module",
  slug: "messages-mcp",
  definition:
    "the MCP server a seat launch runs, joining the seat to the channel its messages arrive on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "SIGTERM and SIGINT each end this server.",
    },
    {
      invariantKind: "departure",
      statement: "A cleanup that throws or stalls does not keep this server running.",
    },
    {
      invariantKind: "departure",
      statement:
        "A message already claimed is left claimed, for the supervisor to weigh on resume.",
    },
  ],
} as const satisfies Module
