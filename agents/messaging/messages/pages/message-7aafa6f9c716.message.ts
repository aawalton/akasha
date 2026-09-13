import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message7aafa6f9c716 = {
  id: "01a09af9-c137-7000-9126-7aafa6f9c716",
  type: "message",
  slug: "message-7aafa6f9c716",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`inbox-relay-service` is broken. inbox-relay-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u inbox-relay-service.service`.\n",
} as const satisfies Message
