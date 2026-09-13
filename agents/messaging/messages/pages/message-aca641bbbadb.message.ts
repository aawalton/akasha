import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageAca641bbbadb = {
  id: "01a09af9-a3ce-7000-8864-aca641bbbadb",
  type: "message",
  slug: "message-aca641bbbadb",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`capacity-relay-service` is broken. capacity-relay-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u capacity-relay-service.service`.\n",
} as const satisfies Message
