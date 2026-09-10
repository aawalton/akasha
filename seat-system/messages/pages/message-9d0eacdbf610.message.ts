import type { Message } from "../message.page-type.types.ts"

export const message9d0eacdbf610 = {
  id: "01a088aa-10c4-7000-b5b0-9d0eacdbf610",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-9d0eacdbf610",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
