import type { Message } from "akasha/seat-system/messages/message.page-type.types.ts"

export const message26b8e8527a13 = {
  id: "01a08d56-b47c-7000-936a-26b8e8527a13",
  type: "message",
  slug: "message-26b8e8527a13",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`inbox-tracking-poll` is broken. inbox-tracking-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u inbox-tracking-poll.service`.\n",
} as const satisfies Message
