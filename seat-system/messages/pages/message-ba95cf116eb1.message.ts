import type { Message } from "../message.page-type.ts"

export const messageBa95cf116eb1 = {
  id: "01a0888b-efe1-7000-aae4-ba95cf116eb1",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-ba95cf116eb1",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
