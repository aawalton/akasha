import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message0d1242a05c1a = {
  id: "01a09af9-de41-7000-9c7c-0d1242a05c1a",
  type: "message",
  slug: "message-0d1242a05c1a",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-relay-service` is broken. monarch-relay-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-relay-service.service`.\n",
} as const satisfies Message
