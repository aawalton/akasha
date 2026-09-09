import type { Message } from "../message.page-type.ts"

export const message4d63a368563f = {
  id: "01a08899-9fa9-7000-a9eb-4d63a368563f",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-4d63a368563f",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
