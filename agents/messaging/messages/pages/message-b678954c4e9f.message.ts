import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageB678954c4e9f = {
  id: "01a09afa-72e4-7000-aba3-b678954c4e9f",
  type: "message",
  slug: "message-b678954c4e9f",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
