import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentMessageRecord = {
  id: "01a0695a-d2ea-7001-bfae-23d087490ecb",
  type: "page-type/module",
  slug: "agent-message-record",
  definition:
    "how code writes a message to a seat by the seat's name and stops where no seat has the name",
  code: "ts",
} as const satisfies Module
