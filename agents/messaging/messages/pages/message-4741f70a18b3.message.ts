import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message4741f70a18b3 = {
  id: "01a09af9-cfb2-7000-b7a7-4741f70a18b3",
  type: "message",
  slug: "message-4741f70a18b3",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies Message
