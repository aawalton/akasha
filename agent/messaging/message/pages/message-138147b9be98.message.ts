import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message138147b9be98 = {
  id: "01a0b3d3-9c75-7000-aaa2-138147b9be98",
  type: "page-type/message",
  slug: "message-138147b9be98",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-18T09:22:04.000Z, and systemd says `exit-code`. This was seen at 2026-09-18T09:23:04.661Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`. This was meant for `amy`, whom nothing could reach: no seat holds the name `amy`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
