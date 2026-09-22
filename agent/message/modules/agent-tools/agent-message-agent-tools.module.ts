import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentMessageAgentTools = {
  id: "01a0695a-d2ea-7719-a70d-79d222213a7b",
  type: "page-type/module",
  slug: "agent-message-agent-tools",
  definition:
    "messages waiting for a seat delivered over the channel, released again where the render fails",
  code: "ts",
} as const satisfies Module
