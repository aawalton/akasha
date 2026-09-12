import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageFb202da278d9 = {
  id: "01a097fe-0b11-7000-b2eb-fb202da278d9",
  type: "message",
  slug: "message-fb202da278d9",
  to: "alan",
  from: "service-watching",
  warrant: "announce",
  body: "`send-due-reminders` is broken. send-due-reminders.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u send-due-reminders.service`. This was meant for `amy`, whom nothing could reach: no seat holds the name `amy`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
