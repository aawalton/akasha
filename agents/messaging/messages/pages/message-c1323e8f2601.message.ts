import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageC1323e8f2601 = {
  id: "01a09af9-ec4e-7000-ad88-c1323e8f2601",
  type: "message",
  slug: "message-c1323e8f2601",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`plants-relay-service` is broken. plants-relay-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u plants-relay-service.service`.\n",
} as const satisfies Message
