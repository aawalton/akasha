import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageD51e10eafa6f = {
  id: "01a09afa-8f63-7000-812e-d51e10eafa6f",
  type: "message",
  slug: "message-d51e10eafa6f",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`overdue-rolling` is broken. overdue-rolling.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u overdue-rolling.service`.\n",
} as const satisfies Message
