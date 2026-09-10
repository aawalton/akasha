import type { Message } from "../message.page-type.types.ts"

export const message3b5de5e74fb7 = {
  id: "01a0888d-bb6d-7000-a9b7-3b5de5e74fb7",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-3b5de5e74fb7",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
