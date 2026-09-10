import type { Message } from "../message.page-type.types.ts"

export const messageA9407e110425 = {
  id: "01a0889c-5504-7000-9494-a9407e110425",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-a9407e110425",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
