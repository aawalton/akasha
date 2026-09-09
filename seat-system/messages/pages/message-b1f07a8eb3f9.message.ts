import type { Message } from "../message.page-type.ts"

export const messageB1f07a8eb3f9 = {
  id: "01a08897-cd93-7000-8920-b1f07a8eb3f9",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-b1f07a8eb3f9",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
