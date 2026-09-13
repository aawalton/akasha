import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message0a434ac66abe = {
  id: "01a09c5a-524b-7000-a55a-0a434ac66abe",
  type: "message",
  slug: "message-0a434ac66abe",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
