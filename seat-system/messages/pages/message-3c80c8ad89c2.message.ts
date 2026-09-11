import type { Message } from "akasha/seat-system/messages/message.page-type.types.ts"

export const message3c80c8ad89c2 = {
  id: "01a09230-232c-7000-8940-3c80c8ad89c2",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-3c80c8ad89c2",
  to: "astra",
  from: "service-watching",
  warrant: "announce",
  body: "`pages-service` is broken. pages-service.service is not listening at 127.0.0.1, ::1, workstation.alanwalton.ts.net, which its page states. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u pages-service.service`.\n",
} as const satisfies Message
