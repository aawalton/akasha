import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message11dd8e282543 = {
  id: "01a0a536-cb6e-7000-a5ba-11dd8e282543",
  type: "message",
  slug: "message-11dd8e282543",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`sweep-subagent-pages` is broken. sweep-subagent-pages.service failed at 2026-09-15T13:16:37.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T13:17:05.797Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u sweep-subagent-pages.service`. This was meant for `athena`, whom nothing could reach: no seat holds the name `athena`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
