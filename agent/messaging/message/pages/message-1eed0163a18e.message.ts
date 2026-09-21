import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message1eed0163a18e = {
  id: "01a0c47c-2706-7000-b41b-1eed0163a18e",
  type: "page-type/message",
  slug: "message-1eed0163a18e",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`send-due-reminders` is broken. send-due-reminders.service failed at 2026-09-21T15:01:03.000Z, and systemd says `exit-code`. This was seen at 2026-09-21T15:01:05.635Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u send-due-reminders.service`. This was meant for `amy`, whom nothing could reach: no seat holds the name `amy`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
