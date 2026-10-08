import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentMessageSupervisorRedeliveryHoldoff = {
  id: "01a06876-abda-7006-92e7-eb3df9fe91a5",
  type: "page-type/module",
  slug: "agent-message-supervisor-redelivery-holdoff",
  definition: "how long a claimed message waits before it may be delivered again",
  code: "ts",
  createdAt: "2026-09-03T18:10:02.842Z",
  updatedAt: "2026-09-22T17:37:14.000Z",
} as const satisfies Module
