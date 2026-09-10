import type { Message } from "../message.page-type.types.ts"

export const messageFf769db969a0 = {
  id: "01a088a6-6a24-7000-8523-ff769db969a0",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-ff769db969a0",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
