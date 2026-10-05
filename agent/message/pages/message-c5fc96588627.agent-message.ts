import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC5fc96588627 = {
  id: "01a10dcf-9b3a-7000-a5f4-c5fc96588627",
  type: "page-type/agent-message",
  slug: "message-c5fc96588627",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed, and systemd had started it again by the time this read it. This was seen at 2026-10-05T20:44:31.658Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
