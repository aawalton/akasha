import type { Message } from "../message.page-type.types.ts"

export const messageCa65112fe486 = {
  id: "01a08894-1e5e-7000-bdcc-ca65112fe486",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-ca65112fe486",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
