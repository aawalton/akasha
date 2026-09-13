import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageEe6c5f946161 = {
  id: "01a09afa-c852-7000-8da6-ee6c5f946161",
  type: "message",
  slug: "message-ee6c5f946161",
  to: "akasha",
  from: "service-watching",
  warrant: "announce",
  body: "`sweep-supervisor-logs` is broken. sweep-supervisor-logs.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u sweep-supervisor-logs.service`.\n",
} as const satisfies Message
