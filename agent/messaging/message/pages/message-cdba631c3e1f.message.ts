import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageCdba631c3e1f = {
  id: "01a0c4be-ede3-7000-bbe7-cdba631c3e1f",
  type: "page-type/message",
  slug: "message-cdba631c3e1f",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`send-due-reminders` is broken. send-due-reminders.service failed at 2026-09-21T16:14:01.000Z, and systemd says `exit-code`. This was seen at 2026-09-21T16:14:01.901Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u send-due-reminders.service`. This was meant for `amy`, whom nothing could reach: no seat holds the name `amy`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
