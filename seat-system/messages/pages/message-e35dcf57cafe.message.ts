import type { Message } from "../message.page-type.ts"

export const messageE35dcf57cafe = {
  id: "01a088b5-fffd-7000-a57e-e35dcf57cafe",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-e35dcf57cafe",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
