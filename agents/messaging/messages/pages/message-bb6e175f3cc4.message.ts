import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageBb6e175f3cc4 = {
  id: "01a09599-8a37-7000-b964-bb6e175f3cc4",
  type: "message",
  slug: "message-bb6e175f3cc4",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies Message
