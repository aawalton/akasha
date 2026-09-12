import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const messagesAgentTools = {
  id: "01a0695a-d2ea-7719-a70d-79d222213a7b",
  type: "module",
  slug: "messages-agent-tools",
  definition:
    "messages waiting for a seat delivered over the channel, released again where the render fails",
  code: "ts",
} as const satisfies Module
