import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message27e0c5358e65 = {
  id: "01a09af9-fb41-7000-b53e-27e0c5358e65",
  type: "message",
  slug: "message-27e0c5358e65",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`safety-relay-service` is broken. safety-relay-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u safety-relay-service.service`.\n",
} as const satisfies Message
