import type { Module } from "@akasha/code-system/module"

export const messagesMcp = {
  id: "01a069cc-ae10-7ea6-a404-37258b7a6cca",
  pageTypeSlug: "module",
  slug: "messages-mcp",
  definition:
    "the MCP server a seat launch runs, joining the seat to the channel its messages arrive on",
  code: "ts",
} as const satisfies Module
