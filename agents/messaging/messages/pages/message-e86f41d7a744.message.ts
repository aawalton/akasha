import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageE86f41d7a744 = {
  id: "01a09b4b-0c25-7000-bd99-e86f41d7a744",
  type: "message",
  slug: "message-e86f41d7a744",
  to: "ember",
  from: "service-watching",
  warrant: "announce",
  body: "`ttc-client` is broken. ttc-client.service is `deactivating` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u ttc-client.service`.\n",
} as const satisfies Message
