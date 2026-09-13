import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message3daaf6b0dbb1 = {
  id: "01a09afa-ba65-7000-a4ec-3daaf6b0dbb1",
  type: "message",
  slug: "message-3daaf6b0dbb1",
  to: "akasha",
  from: "service-watching",
  warrant: "announce",
  body: "`sweep-log-days` is broken. sweep-log-days.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u sweep-log-days.service`.\n",
} as const satisfies Message
