import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageF49a18958712 = {
  id: "01a09af9-92ac-7000-9bdc-f49a18958712",
  type: "message",
  slug: "message-f49a18958712",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`attributes-relay-service` is broken. attributes-relay-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u attributes-relay-service.service`.\n",
} as const satisfies Message
