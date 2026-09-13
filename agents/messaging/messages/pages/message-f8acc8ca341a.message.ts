import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageF8acc8ca341a = {
  id: "01a09afa-1732-7000-aa8d-f8acc8ca341a",
  type: "message",
  slug: "message-f8acc8ca341a",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`surplus-relay-service` is broken. surplus-relay-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u surplus-relay-service.service`.\n",
} as const satisfies Message
