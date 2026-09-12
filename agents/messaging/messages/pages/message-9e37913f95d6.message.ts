import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message9e37913f95d6 = {
  id: "01a096fb-d211-7000-b7f2-9e37913f95d6",
  type: "message",
  slug: "message-9e37913f95d6",
  to: "ember",
  from: "service-watching",
  warrant: "announce",
  body: "`ttc-client` is broken. ttc-client.service is `deactivating` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u ttc-client.service`.\n",
} as const satisfies Message
