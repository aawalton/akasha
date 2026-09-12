import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message09e21fb29f3a = {
  id: "01a09598-ad32-7000-b950-09e21fb29f3a",
  type: "message",
  slug: "message-09e21fb29f3a",
  to: "ember",
  from: "service-watching",
  warrant: "announce",
  body: "`ttc-client` is broken. ttc-client.service is `inactive` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u ttc-client.service`.\n",
} as const satisfies Message
