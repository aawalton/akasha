import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentMessageSupervisorClaim = {
  id: "01a0687b-aa7f-7000-a9b1-924dd4d7a5b4",
  type: "page-type/module",
  slug: "agent-message-supervisor-claim",
  definition: "the claim a supervisor has on a message while it delivers it",
  code: "ts",
} as const satisfies Module
