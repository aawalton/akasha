import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageBe2022271a1e = {
  id: "01a0aad5-8135-7000-bc88-be2022271a1e",
  type: "page-type/message",
  slug: "message-be2022271a1e",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 59a901cb8954b3813412b5f47dc19761d77ed34f found 1 check newly refusing.\n`index-is-level-with-the-pages` refused 1 time:\n  seat/pages/thea/thea.seat.referenced-by — the index entry for this file is named by a page and missing from the index\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
