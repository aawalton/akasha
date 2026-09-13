import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message933c6e1a5682 = {
  id: "01a09c8e-48b7-7000-b044-933c6e1a5682",
  type: "message",
  slug: "message-933c6e1a5682",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies Message
