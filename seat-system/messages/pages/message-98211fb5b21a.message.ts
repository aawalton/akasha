import type { Message } from "../message.page-type.types.ts"

export const message98211fb5b21a = {
  id: "01a088a4-914e-7000-bb0c-98211fb5b21a",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-98211fb5b21a",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
