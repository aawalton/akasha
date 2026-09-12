import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message3518f9c5c200 = {
  id: "01a09532-ffc6-7000-a3ae-3518f9c5c200",
  type: "message",
  slug: "message-3518f9c5c200",
  to: "ember",
  from: "service-watching",
  warrant: "announce",
  body: "`ttc-client` is broken. ttc-client.service is `inactive` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u ttc-client.service`.\n",
} as const satisfies Message
