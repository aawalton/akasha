import type { Message } from "../message.page-type.ts"

export const message350246ad2848 = {
  id: "01a088b3-44dc-7000-bef0-350246ad2848",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-350246ad2848",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
