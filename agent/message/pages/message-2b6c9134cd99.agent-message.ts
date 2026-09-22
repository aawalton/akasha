import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message2b6c9134cd99 = {
  id: "01a0ca8d-b7af-7000-92bf-2b6c9134cd99",
  type: "page-type/agent-message",
  slug: "message-2b6c9134cd99",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at b1af01f4cdc009a842b6abf0b8ab61a7744e3f99 found 1 check newly refusing.\n`no-unused-exports` refused 2 times:\n  page/access/modules/read-gate/read-gate.module.code.ts — exports `narrowedTo`, which no other file names — a value only its own file names is published for nothing\n  page/access/modules/read-gate/read-gate.module.code.ts — exports `reachFor`, which no other file names — a value only its own file names is published for nothing\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies AgentMessage
