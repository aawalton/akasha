import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisorMessageClaim = {
  id: "01a0687b-aa7f-7000-a9b1-924dd4d7a5b4",
  type: "module",
  slug: "supervisor-message-claim",
  definition: "the claim a supervisor has on a message while it delivers it",
  code: "ts",
} as const satisfies Module
