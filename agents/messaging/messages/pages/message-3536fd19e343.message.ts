import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message3536fd19e343 = {
  id: "01a09622-2abf-7000-8d04-3536fd19e343",
  type: "message",
  slug: "message-3536fd19e343",
  to: "alan",
  from: "service-watching",
  warrant: "announce",
  body: "`send-due-reminders` is broken. send-due-reminders.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u send-due-reminders.service`. This was meant for `amy`, whom nothing could reach: no seat holds the name `amy`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
