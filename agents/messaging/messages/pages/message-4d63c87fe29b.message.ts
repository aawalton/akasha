import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message4d63c87fe29b = {
  id: "01a09afa-2452-7000-b045-4d63c87fe29b",
  type: "message",
  slug: "message-4d63c87fe29b",
  to: "akasha",
  from: "service-watching",
  warrant: "announce",
  body: "`active-calories-service` is broken. active-calories-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u active-calories-service.service`.\n",
} as const satisfies Message
