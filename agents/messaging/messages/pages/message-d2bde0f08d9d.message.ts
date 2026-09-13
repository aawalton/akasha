import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageD2bde0f08d9d = {
  id: "01a09b7f-583e-7000-a073-d2bde0f08d9d",
  type: "message",
  slug: "message-d2bde0f08d9d",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
