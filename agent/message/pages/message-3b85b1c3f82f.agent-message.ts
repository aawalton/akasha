import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message3b85b1c3f82f = {
  id: "01a0d4d2-ed49-7000-9888-3b85b1c3f82f",
  type: "page-type/agent-message",
  slug: "message-3b85b1c3f82f",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "a run at 7afa73cc1436e5a29d684bc5b7d05dbcbef3440b over 5 checks asked for by name found 1 check newly refusing.\n`no-unused-exports` refused 2 times:\n  alan/harness/monarch/modules/rules/monarch-rules.module.code.ts — exports `fires`, which nothing names — a value nothing names is code nothing runs\n  alan/harness/monarch/modules/transaction/monarch-transaction.module.code.ts — exports `money`, which nothing names — a value nothing names is code nothing runs\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies AgentMessage
