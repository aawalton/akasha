import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentMessageSupervisorRedeliveryHoldoff = {
  id: "01a06876-abda-7006-92e7-eb3df9fe91a5",
  type: "page-type/module",
  slug: "agent-message-supervisor-redelivery-holdoff",
  definition: "the time a supervisor waits before a claim is released",
  code: "ts",
  createdAt: "2026-09-03T18:10:02.842Z",
  updatedAt: "2026-10-19T18:19:13.421Z",
} as const satisfies Module
