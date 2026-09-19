import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message34600537f6e5 = {
  id: "01a0ba2b-c2bd-7000-ab57-34600537f6e5",
  type: "page-type/message",
  slug: "message-34600537f6e5",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`day-readout-watch-service` is broken. day-readout-watch-service.service last said its work landed 2026-09-19T14:25:28.083Z, longer ago than the 900s it may go. This was seen at 2026-09-19T14:57:04.894Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u day-readout-watch-service.service`. This was meant for `amy`, whom nothing could reach: no seat holds the name `amy`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
