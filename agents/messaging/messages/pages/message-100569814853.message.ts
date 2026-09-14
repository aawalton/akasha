import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message100569814853 = {
  id: "01a0a1a5-0fcf-7000-9351-100569814853",
  type: "message",
  slug: "message-100569814853",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-14T20:38:06.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T20:39:04.242Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
