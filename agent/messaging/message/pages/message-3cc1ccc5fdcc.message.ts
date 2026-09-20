import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message3cc1ccc5fdcc = {
  id: "01a0bf14-b89c-7000-8c0c-3cc1ccc5fdcc",
  type: "page-type/message",
  slug: "message-3cc1ccc5fdcc",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`spotify-sync` is broken. spotify-sync.service failed at 2026-09-20T13:49:28.000Z, and systemd says `exit-code`. This was seen at 2026-09-20T13:50:01.078Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u spotify-sync.service`. This was meant for `eppie`, whom nothing could reach: no seat holds the name `eppie`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
