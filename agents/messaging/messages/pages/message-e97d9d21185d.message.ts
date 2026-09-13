import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageE97d9d21185d = {
  id: "01a09b3b-8640-7000-813b-e97d9d21185d",
  type: "message",
  slug: "message-e97d9d21185d",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
