import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message80d8a5ea0b12 = {
  id: "01a09553-11bc-7000-aa24-80d8a5ea0b12",
  type: "message",
  slug: "message-80d8a5ea0b12",
  to: "alan",
  from: "service-watching",
  warrant: "announce",
  body: "`audit-running` is broken. audit-running.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u audit-running.service`. This was meant for `thea`, whom nothing could reach: no seat holds the name `thea`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
