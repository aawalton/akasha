import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message1bdbf6fa2b8e = {
  id: "01a0c48a-fff4-7000-9606-1bdbf6fa2b8e",
  type: "page-type/message",
  slug: "message-1bdbf6fa2b8e",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 0807109bfc458037a82f0f0f6b2ae138bba6f971 found 2 checks newly refusing.\n`id-is-a-uuid-version-7` refused 1 time:\n  agent/messaging/message/pages/message-dd5d1353f915.message.ts — line 4 states id \"82f4ee3f-e4ff-4a54-b606-dd5d1353f915\", which is a uuid version 4, and a page's identity is a uuid version 7\n`index-is-level-with-the-pages` refused 2 times:\n  decision-kind/pages/departure.decision-kind.referenced-by — the index entry for this file is in the index differing from what its page says\n  domain.page-type.referenced-by — the index entry for this file is in the index differing from what its page says\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
