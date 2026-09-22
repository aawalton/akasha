import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageAa08de9dbd13 = {
  id: "01a0c9e6-65c9-7000-868b-aa08de9dbd13",
  type: "page-type/message",
  slug: "message-aa08de9dbd13",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 1d8eee9cd0865f8ee699f11d4bf438f3806c7377 found 1 check newly refusing.\n`index-is-level-with-the-pages` refused 12 times:\n  catalog/gear/temper-armor-slot/pages/chest.temper-armor-slot.referenced-by — the index entry for this file is named by a page and missing from the index\n  catalog/gear/temper-armor-slot/pages/feet.temper-armor-slot.referenced-by — the index entry for this file is named by a page and missing from the index\n  catalog/gear/temper-armor-slot/pages/hands.temper-armor-slot.referenced-by — the index entry for this file is named by a page and missing from the index\n  catalog/gear/temper-armor-slot/pages/head.temper-armor-slot.referenced-by — the index entry for this file is named by a page and missing from the index\n  catalog/gear/temper-armor-slot/pages/legs.temper-armor-slot.referenced-by — the index entry for this file is named by a page and missing from the index\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
