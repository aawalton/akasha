import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageEe7936d4121e = {
  id: "01a0a48b-f2ad-7000-a5c7-ee7936d4121e",
  type: "message",
  slug: "message-ee7936d4121e",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 4951bf3e26998561f1b4290efe06549e84ed5b76 found 1 check newly refusing.\n`index-is-level-with-the-pages` refused 2 times:\n  harness/monarch/category/pages/utilities.monarch-category.referenced-by — the index entry for this file is in the index differing from what its page says\n  seat/pages/amy/amy.seat.referenced-by — the index entry for this file is in the index and named by no page\n/var/home/walton/.local/state/workstation-services/audit-verdicts.json holds what each of them answered, whole.\n",
} as const satisfies Message
