import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message12ff6aa5c571 = {
  id: "01a09cb1-0636-7000-8218-12ff6aa5c571",
  type: "message",
  slug: "message-12ff6aa5c571",
  to: "ember",
  from: "service-watching",
  warrant: "announce",
  body: "`ttc-client` is broken. ttc-client.service is `inactive` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u ttc-client.service`.\n",
} as const satisfies Message
