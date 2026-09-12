import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message994a114db1b8 = {
  id: "01a09589-0f68-7000-8480-994a114db1b8",
  type: "message",
  slug: "message-994a114db1b8",
  to: "ember",
  from: "service-watching",
  warrant: "announce",
  body: "`ttc-client` is broken. ttc-client.service is `inactive` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u ttc-client.service`.\n",
} as const satisfies Message
