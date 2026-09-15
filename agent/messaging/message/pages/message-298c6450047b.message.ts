import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message298c6450047b = {
  id: "01a0a578-c23a-7000-8233-298c6450047b",
  type: "message",
  slug: "message-298c6450047b",
  to: "seat/astra",
  from: "service-watching",
  warrant: "announce",
  body: "`page-service` is broken. page-service.service is not listening at workstation.alanwalton.ts.net, which its page states. This was seen at 2026-09-15T14:29:01.288Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u page-service.service`.\n",
} as const satisfies Message
