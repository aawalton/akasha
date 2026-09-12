import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message99dbbbad8d57 = {
  id: "01a0930d-b462-7000-84e4-99dbbbad8d57",
  type: "message",
  slug: "message-99dbbbad8d57",
  to: "ember",
  from: "service-watching",
  warrant: "announce",
  body: "`ttc-client` is broken. ttc-client.service is `inactive` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u ttc-client.service`.\n",
} as const satisfies Message
