import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const messagesMcp = {
  id: "01a069cc-ae10-7ea6-a404-37258b7a6cca",
  type: "module",
  slug: "messages-mcp",
  definition:
    "the MCP server a seat launch runs, joining the seat to the channel its messages arrive on",
  code: "ts",
} as const satisfies Module
