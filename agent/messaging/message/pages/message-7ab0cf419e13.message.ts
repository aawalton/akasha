import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message7ab0cf419e13 = {
  id: "01a0bae7-9a86-7000-89ba-7ab0cf419e13",
  type: "page-type/message",
  slug: "message-7ab0cf419e13",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 68aa1853514c858dbeaba1af3778d6b56ca0d402 found 1 check newly refusing.\n`index-is-level-with-the-pages` refused 3 times:\n  seat/pages/nimue/nimue.seat.referenced-by — the index entry for this file is in the index differing from what its page says\n  subagent/subagent.page-type.referenced-by — the index entry for this file is in the index differing from what its page says\n  initiative/pages/nimue-auth.initiative.referenced-by — the index entry for this file is in the index differing from what its page says\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
